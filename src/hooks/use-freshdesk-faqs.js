import { useEffect, useState } from "react";
import axios from "axios";

// const GENERAL = 'GENERAL'
const FELLOWS = "FELLOWS";
// const FRESHDESK_API_ROOT = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
// const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY;
const FRESHDESK_API_ROOT = "https://bdcatalyst.freshdesk.com/api/v2";
const FRESHDESK_API_KEY = "pPdU3tldVlQt0TdXAMO";
const FRESHDESK_GENERAL_FAQS_CATEGORY_ID = "60000157358";
const FRESHDESK_FELLOWS_FAQS_CATEGORY_ID = "60000294708";

const requestOptions = {
  "Content-Type": "application/json",
  auth: { username: FRESHDESK_API_KEY, password: "X" },
};

export const useFreshdeskFaqs = (category) => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let categoryId = FRESHDESK_GENERAL_FAQS_CATEGORY_ID;
    if (category === FELLOWS) {
      categoryId = FRESHDESK_FELLOWS_FAQS_CATEGORY_ID;
    }
    const fetchArticles = async () => {
      await axios
        .get(
          `${FRESHDESK_API_ROOT}/solutions/categories/${categoryId}/folders`,
          requestOptions
        )
        .then((response) => {
          // console.log(response.data)
          const folders = response.data.sort((f, g) => f.name > g.name);
          folders.map((folder) =>
            axios
              .get(
                `${FRESHDESK_API_ROOT}/solutions/folders/${folder.id}/articles`,
                requestOptions
              )
              .then((response) => {
                // A Freshdesk article's status is either 1 or 2, for draft or published, respectively
                // We'll filter here for only the published articles.
                folder.articles = response.data.filter(
                  (article) => article.status === 2
                );
                return folder;
              })
              .then((result) => {
                setFolders([...folders]);
              })
              .finally((res) => {
                setIsLoading(false);
              })
          );
          // Promise.all(articlePromises).then(responses => setFolders(responses));
        })
        .catch((error) => {
          setError("An error occurred while fetching articles from Freshdesk.");
          setIsLoading(false);
        });
    };
    fetchArticles();
  }, [category]);

  return { isLoading, folders, error };
};
