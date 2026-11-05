const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const UPCOMING_DAYS = 30;

const today = new Date();
const thisYear = today.getFullYear();

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
}

function ordinal(n) {
    const tens = n % 100;
    const suffix = tens >= 11 && tens <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
    return n + suffix;
}

function surname(name) {
    const parts = name.trim().split(/\s+/);
    return parts[parts.length - 1] || name;
}

// Dates come as YYYY-MM-DD and are read by hand so time zones never shift the day
function loadEvents() {
    const records = JSON.parse(document.getElementById('calendar-data').textContent);
    return records
        .map(record => {
            const [year, month, day] = record.date.split('-').map(Number);
            return { ...record, year, month: month - 1, day, years: thisYear - year };
        })
        .filter(event => event.year && event.day)
        .sort((x, y) => x.month - y.month || x.day - y.day || x.year - y.year);
}

function matches(event, query) {
    return !query || `${event.a} ${event.b} ${event.year}`.toLowerCase().includes(query);
}

function daysUntil(event) {
    const next = new Date(thisYear, event.month, event.day);
    const start = new Date(thisYear, today.getMonth(), today.getDate());
    if (next < start) next.setFullYear(thisYear + 1);
    return Math.round((next - start) / 86400000);
}

function eventCard(event, { showDate = false } = {}) {
    const card = el('article', 'fcal-event');
    const couple = el('a', 'fcal-couple');
    couple.href = event.url;
    couple.append(el('span', null, event.a), el('span', 'fcal-amp', ' & '), el('span', null, event.b));

    const meta = el('p', 'fcal-meta');
    const when = showDate ? `${event.day} ${MONTHS[event.month]} ${event.year}` : `Married ${event.year}`;
    meta.textContent = event.years > 0 ? `${when} · ${ordinal(event.years)} anniversary this year` : when;

    card.append(couple, meta);
    if (event.trees.length) {
        const trees = el('p', 'fcal-trees');
        event.trees.forEach((tree, index) => {
            if (index) trees.append(' · ');
            const link = el('a', null, tree.title);
            link.href = tree.url;
            trees.append(link);
        });
        card.append(trees);
    }
    return card;
}

function renderSpotlight(container, events) {
    const todays = events.filter(e => e.month === today.getMonth() && e.day === today.getDate());
    const upcoming = events
        .map(e => ({ e, wait: daysUntil(e) }))
        .filter(({ wait }) => wait > 0 && wait <= UPCOMING_DAYS)
        .sort((x, y) => x.wait - y.wait)
        .slice(0, 3);

    const box = el('section', 'fcal-spotlight');
    if (todays.length) {
        box.append(el('h2', null, 'On this day'));
        const list = el('div', 'fcal-cards');
        todays.forEach(e => list.append(eventCard(e, { showDate: true })));
        box.append(list);
    }
    if (upcoming.length) {
        box.append(el('h2', null, todays.length ? 'Coming up' : 'Coming up in the next month'));
        const list = el('div', 'fcal-cards');
        upcoming.forEach(({ e, wait }) => {
            const card = eventCard(e, { showDate: true });
            card.prepend(el('span', 'fcal-badge', wait === 1 ? 'Tomorrow' : `In ${wait} days`));
            list.append(card);
        });
        box.append(list);
    }
    if (box.childElementCount) container.append(box);
}

function initCalendar() {
    const root = document.getElementById('family-calendar');
    const events = loadEvents();
    const state = { month: today.getMonth(), query: '', selectedDay: null };

    const spotlight = el('div');
    renderSpotlight(spotlight, events);

    const search = el('input', 'fcal-search');
    search.type = 'search';
    search.placeholder = 'Search a family name, e.g. Anandappa';
    search.setAttribute('aria-label', 'Search marriages by name or year');

    const strip = el('div', 'fcal-months');
    strip.setAttribute('role', 'tablist');
    const header = el('div', 'fcal-header');
    const title = el('h2', 'fcal-title');
    const prev = el('button', 'fcal-nav', '‹');
    const next = el('button', 'fcal-nav', '›');
    prev.setAttribute('aria-label', 'Previous month');
    next.setAttribute('aria-label', 'Next month');
    header.append(prev, title, next);

    const summary = el('p', 'fcal-summary');
    const grid = el('div', 'fcal-grid');
    const list = el('div', 'fcal-list');

    root.append(spotlight, search, strip, header, summary, grid, list);

    function visible() {
        return events.filter(e => matches(e, state.query));
    }

    function renderStrip(shown) {
        strip.replaceChildren();
        MONTHS.forEach((name, index) => {
            const count = shown.filter(e => e.month === index).length;
            const button = el('button', 'fcal-month');
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', index === state.month);
            button.append(el('span', null, name.slice(0, 3)), el('small', null, count || '·'));
            if (!count) button.classList.add('fcal-empty');
            button.addEventListener('click', () => { state.month = index; state.selectedDay = null; render(); });
            strip.append(button);
        });
    }

    function renderGrid(monthEvents) {
        grid.replaceChildren();
        WEEKDAYS.forEach(day => grid.append(el('div', 'fcal-weekday', day)));
        const offset = new Date(thisYear, state.month, 1).getDay();
        // Always show 29 February, since weddings on it still have an anniversary
        const length = state.month === 1 ? 29 : new Date(thisYear, state.month + 1, 0).getDate();
        for (let i = 0; i < offset; i++) grid.append(el('div', 'fcal-cell fcal-blank'));
        for (let day = 1; day <= length; day++) {
            const dayEvents = monthEvents.filter(e => e.day === day);
            const cell = el(dayEvents.length ? 'button' : 'div', 'fcal-cell');
            cell.append(el('span', 'fcal-daynum', day));
            if (state.month === today.getMonth() && day === today.getDate()) cell.classList.add('fcal-today');
            if (day === state.selectedDay) cell.classList.add('fcal-selected');
            if (dayEvents.length) {
                cell.classList.add('fcal-has');
                cell.setAttribute('aria-label', `${day} ${MONTHS[state.month]}: ${dayEvents.length} anniversaries`);
                dayEvents.slice(0, 2).forEach(e => cell.append(el('span', 'fcal-chip', `${surname(e.a)} & ${surname(e.b)}`)));
                if (dayEvents.length > 2) cell.append(el('span', 'fcal-more', `+${dayEvents.length - 2} more`));
                cell.addEventListener('click', () => {
                    state.selectedDay = state.selectedDay === day ? null : day;
                    render();
                    if (state.selectedDay) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
            grid.append(cell);
        }
    }

    function renderList(monthEvents) {
        list.replaceChildren();
        const shown = state.selectedDay ? monthEvents.filter(e => e.day === state.selectedDay) : monthEvents;
        if (!shown.length) {
            list.append(el('p', 'fcal-none', state.query ? 'No matching anniversaries this month.' : 'No anniversaries recorded this month.'));
            return;
        }
        let lastDay = null;
        shown.forEach(e => {
            if (e.day !== lastDay) {
                list.append(el('h3', 'fcal-day', `${e.day} ${MONTHS[e.month]}`));
                lastDay = e.day;
            }
            list.append(eventCard(e));
        });
        if (state.selectedDay) {
            const all = el('button', 'fcal-showall', `Show all of ${MONTHS[state.month]}`);
            all.addEventListener('click', () => { state.selectedDay = null; render(); });
            list.append(all);
        }
    }

    function render() {
        const shown = visible();
        const monthEvents = shown.filter(e => e.month === state.month);
        title.textContent = MONTHS[state.month];
        summary.textContent = state.query
            ? `${shown.length} ${shown.length === 1 ? 'marriage matches' : 'marriages match'} “${search.value.trim()}” across the year · ${monthEvents.length} in ${MONTHS[state.month]}`
            : `${monthEvents.length} ${monthEvents.length === 1 ? 'anniversary' : 'anniversaries'} in ${MONTHS[state.month]}`;
        spotlight.hidden = Boolean(state.query);
        renderStrip(shown);
        renderGrid(monthEvents);
        renderList(monthEvents);
    }

    prev.addEventListener('click', () => { state.month = (state.month + 11) % 12; state.selectedDay = null; render(); });
    next.addEventListener('click', () => { state.month = (state.month + 1) % 12; state.selectedDay = null; render(); });
    search.addEventListener('input', () => {
        state.query = search.value.trim().toLowerCase();
        state.selectedDay = null;
        // Jump to the first month with a match so a search never looks empty
        const first = visible()[0];
        if (state.query && first && !visible().some(e => e.month === state.month)) state.month = first.month;
        render();
    });

    render();
}

document.addEventListener('DOMContentLoaded', initCalendar);
