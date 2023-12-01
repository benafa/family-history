const handleReady = ({ detail }) => {
    const { memberInfo } = detail;

    if (memberInfo) {
        console.log(memberInfo.email)
        var elements = document.getElementsByClassName('comment-allowed');

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }

        var elements = document.getElementsByClassName('comment-denied');

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }


    } else {
        var elements = document.getElementsByClassName('comment-allowed');

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }

        var elements = document.getElementsByClassName('comment-denied');

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    }
}

document.addEventListener('MemberSpace.ready', handleReady);