import React from "react";
import { compactNum } from "../../utils";
import { LoadingPanel } from "./LoadingPanel";
import { Tabs } from "./Tabs";
import { useQuery } from "../../hooks";

export const Programs = ({
  selectedProgram,
  setSelectedProgram,
}) => {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryFn: getProgramList,
    queryKey: "programs",
  });

  if (isLoading || !data) return <LoadingPanel />;
  if (error) return "Something went wrong!";

  const tabData = data.map(({ name, numberOfStudies }) => ({
    key: name,
    title: name,
    subtitle: `${compactNum(numberOfStudies)} stud${new Intl.PluralRules("en-US").select(numberOfStudies) === "one" ? "y" : "ies"}`,
  }));

  return (
    <Tabs
      data={tabData}
      selectedTab={selectedProgram}
      setSelectedTab={setSelectedProgram}
      ariaLabeledBy="programs-title"
    />
  );
};

// API
const getProgramList = async () => {
  const { href } = new URL(
    "/search-api/program_list",
    process.env.GATSBY_DUG_SEARCH_API
  );

  const res = await fetch(href, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} Error: ${res.statusText}`);

  const data = await res.json();

  return data.result.map((original) => ({
    name: original.key,
    documentCount: original.doc_count,
    numberOfStudies: original.No_of_studies.value,
  }));
}
