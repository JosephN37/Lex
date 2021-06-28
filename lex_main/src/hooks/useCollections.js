import { useEffect, useState } from "react";
import { firestore } from "../firebase";

function useCollections(collectionPath) {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const getCollections = await firestore
        .collection(collectionPath)
        .onSnapshot(
          (snapshot) => {
            if (snapshot.size) {
              var data = [];
              snapshot.forEach((doc) => {
                data.push({ ...doc.data(), uid: doc.id });
              });
              setData(data);
              setLoading(false);
            } else {
              setLoading(false);
            }
          },
          (error) => setError(error.message)
        );

      return () => {
        getCollections();
      };
    })();
  }, [collectionPath]);

  return { isLoading, isError, data}
}

export default useCollections;