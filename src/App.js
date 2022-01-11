import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./APIs/Api";
import CountrySelector from "./component/CountrySelector";
import HighLight from "./component/Highlight";
import Summary from "./component/Summary";
import { sortBy } from "lodash";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";

import "moment/locale/vi";
moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const country = sortBy(res.data, "Country");
      setCountries(country);

      setSelectedCountryId("vn");
    });
  }, []);

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find(
        (item) => item.ISO2 === selectedCountryId.toUpperCase()
      );
      getReportByCountry(selectedCountry.Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryId, countries]);

  return (
    <div className="bgColor">
      <Container>
        <Typography variant="h2" component="h2">
          Số liệu COVID-19
        </Typography>
        <Typography variant="h6" component="h6">
          {moment().format("LLL")}
        </Typography>
        <CountrySelector
          countries={countries}
          handleOnChange={handleOnChange}
          value={selectedCountryId}
        />
        <HighLight report={report} />
        <Summary report={report} selectedCountryId={selectedCountryId} />
      </Container>
    </div>
  );
}

export default App;
