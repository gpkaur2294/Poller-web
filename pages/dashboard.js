import React from "react";
import CollapsibleTable from "../components/DashBoardTable";
import Header from "../components/Header";
import Alert from "@material-ui/lab/Alert";

export default function DashBoard() {
  const [urls, setUrls] = React.useState([]);
  const [noUrls, setNoUrls] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  async function fetchUrlsData() {
    try {
      const res = await fetch("http://localhost:8080/poller/urls");
      res.json().then((response) => {
        if (!response.error) {
          setUrls(response);
        } else {
          if (response.error.code == 201) {
            setNoUrls(true);
          }
        }
      });
    } catch (error) {
      setHasError(true);
    }
  }

  React.useEffect(() => {
    fetchUrlsData();
  }, []);

  return (
    <div>
      <Header></Header>
      {hasError && <Alert severity="error">Sorry Something went wrong</Alert>}

      {noUrls && urls.length <= 0 && (
        <Alert severity="info">
          No Urls are added yet! Please click to <a href="/">add new url</a>
        </Alert>
      )}

      {urls.length > 0 && <CollapsibleTable urls={urls}></CollapsibleTable>}
    </div>
  );
}
