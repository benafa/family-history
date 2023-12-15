import { getGraphQLDataWrapper } from '../fetch/fetch_data';

const people_queries = {
    basic: `
      {
      individuals {
        id
        GIVN
        SURN
      }
    }`,
    with_parents: `
      {
      individuals {
        id
        GIVN
        SURN
        parents {
          GIVN
          SURN
          SEX
          id 
        } 
      }
    }`,
    detailed: `
      {
      individuals {
        id
        GIVN
        SURN
        parents {
          GIVN
          SURN
          SEX
          id 
        } 
        spouses {
          GIVN
          SURN
          id
          SEX
        }
      }
    }`,
};

export async function getPeopleList(query_type = "basic") {
    console.log("getPeopleList");
    const query = people_queries[query_type];

    try {
        const peopleData = await getGraphQLDataWrapper(query);
        return peopleData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}