import { getGraphQLDataWrapper } from '../fetch/fetch_data';

export async function getPeopleList() {
    const query = `
      {
      individuals {
        id
        GIVN
        SURN
      }
    }
    `;

    try {
        const peopleData = await getGraphQLDataWrapper(query);
        return peopleData;
    } catch (error) {
        // console.error('Error:', error);
        throw error;
    }
}