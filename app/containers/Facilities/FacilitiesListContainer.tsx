import React, { useMemo } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import getConfig from "next/config";
import { FacilitiesListContainer_query } from "FacilitiesListContainer_query.graphql";
import FacilitiesRowItemContainer from "./FacilitiesRowItemContainer";
import {
  TableFilter,
  TextFilter,
  EnumFilter,
  NumberFilter,
  ApplicationStatusFilter,
  NoHeaderFilter,
  ReportingPeriodFilter,
  YesNoFilter,
} from "components/FilterableTable/Filters";
import FilterableTableLayout from "components/FilterableTable/FilterableTable";
import { useRouter } from "next/router";
import safeJsonParse from "lib/safeJsonParse";

interface Props {
  query: FacilitiesListContainer_query;
}

const filters: TableFilter[] = [
  new TextFilter("Operator Name", "operatorName", { sortable: false }),
  new TextFilter("Facility Name", "facilityName", { sortable: false }),
  new EnumFilter<String>(
    "Facility Type",
    "facilityType",
    ["SFO", "IF_a", "IF_b", "L_c"],
    { renderEnumValue: (label) => label, sortable: false }
  ),
  new TextFilter("BC GHG id", "facilityBcghgid", { sortable: false }),
  new YesNoFilter("SWRS Report Received", "hasSwrsReport"),
  new ApplicationStatusFilter(
    "Application Status",
    "applicationStatus",
    "applicationIdIsNull"
  ),
  new NumberFilter("Application #", "applicationId", { sortable: false }),
  new NoHeaderFilter(),
];

export const FacilitiesList: React.FunctionComponent<Props> = ({ query }) => {
  const {
    facilityApplicationByReportingYear: { edges, totalCount },
    allReportingYears: { edges: reportingYears },
    defaultDisplayedReportingYear,
  } = query;

  const adminEmail = getConfig()?.publicRuntimeConfig.ADMIN_EMAIL;
  const adminMailToUrl = adminEmail ? `mailto:${adminEmail}` : "#";

  const router = useRouter();
  const selectedReportingYear = useMemo(
    () =>
      safeJsonParse(router.query.filterArgs as string).reportingYear ||
      defaultDisplayedReportingYear.reportingYear,
    [router]
  );

  const body = (
    <tbody>
      {edges.map((edge) => (
        <FacilitiesRowItemContainer
          key={`${edge.node.facilityId}-${selectedReportingYear}`}
          facilityApplication={edge.node}
          reportingYear={selectedReportingYear}
          query={query}
        />
      ))}
    </tbody>
  );

  const selectableReportingYears = [];
  reportingYears.forEach(({ node }) => {
    if (node.reportingYear < new Date().getFullYear())
      selectableReportingYears.push(node.reportingYear);
  });

  const reportingPeriodFilter = new ReportingPeriodFilter(
    "reportingYear",
    selectableReportingYears,
    defaultDisplayedReportingYear.reportingYear
  );

  return (
    <>
      <FilterableTableLayout
        paginated
        body={body}
        filters={filters}
        extraFilters={[reportingPeriodFilter]}
        totalCount={totalCount}
      />
      If you cannot find your facility in the list, please{" "}
      <a href={adminMailToUrl}>contact CAS</a> at {adminEmail} for assistance.
    </>
  );
};

export default createFragmentContainer(FacilitiesList, {
  query: graphql`
    fragment FacilitiesListContainer_query on Query
    @argumentDefinitions(
      operatorName: { type: "String" }
      facilityName: { type: "String" }
      facilityType: { type: "String" }
      applicationIdIsNull: { type: "Boolean" }
      applicationId: { type: "Int" }
      facilityBcghgid: { type: "String" }
      hasSwrsReport: { type: "Boolean" }
      applicationStatus: { type: "CiipApplicationRevisionStatus" }
      organisationRowId: { type: "Int" }
      offsetValue: { type: "Int" }
      reportingYear: { type: "Int" }
      pageSize: { type: "Int" }
      offset: { type: "Int" }
    ) {
      ...FacilitiesRowItemContainer_query
      facilityApplicationByReportingYear(
        first: $pageSize
        offset: $offset
        _reportingYear: $reportingYear
        filter: {
          organisationId: { equalTo: $organisationRowId }
          operatorName: { includesInsensitive: $operatorName }
          facilityName: { includesInsensitive: $facilityName }
          facilityType: { equalTo: $facilityType }
          applicationStatus: { equalTo: $applicationStatus }
          applicationId: {
            isNull: $applicationIdIsNull
            equalTo: $applicationId
          }
          facilityBcghgid: { includes: $facilityBcghgid }
          hasSwrsReport: { equalTo: $hasSwrsReport }
        }
      ) {
        edges {
          node {
            facilityId
            ...FacilitiesRowItemContainer_facilityApplication
          }
        }
        totalCount
      }
      allReportingYears {
        edges {
          node {
            reportingYear
          }
        }
      }

      defaultDisplayedReportingYear {
        reportingYear
      }
    }
  `,
});
