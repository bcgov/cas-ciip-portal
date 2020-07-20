import React from 'react';

const LegalDisclaimerText: React.FunctionComponent = () => {
  return (
    <>
      <p>In this application:</p>
      <ol id="glossary">
        <li>
          (a) &quot;CIIP&quot; means the{' '}
          <a href="https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/cleanbc-program-for-industry/cleanbc-industrial-incentive-program">
            CleanBC Industrial Incentive Program;
          </a>
        </li>
        <li>
          (b) &quot;Certifying Official&quot; means the person who approves this
          application on behalf of the Operator;
        </li>
        <li>
          (c) &quot;GGIRCA&quot; means{' '}
          <em>Greenhouse Gas Industrial Reporting and Control Act</em>;
        </li>
        <li>
          (d) &quot;Operator&quot; means the person identified in the Greenhouse
          Gas Emission Reporting Regulation responsible for the Reporting
          Operation;
        </li>
        <li>
          (e) &quot;Province&quot; means Her Majesty the Queen in Right of
          British Columbia;
        </li>
        <li>
          (f) &quot;Reporting Operation&quot; means the industrial operation
          identified in the application;
        </li>
        <li>
          (g) &quot;Representative&quot; means the individual completing this
          application on behalf of the Operator.
        </li>
      </ol>
      <p>
        By approving and submitting this application, the Certifying Official
        and Representative agree as follows:
      </p>
      <ol id="consents">
        <li>
          The Certifying Official warrants and represents that the Certifying
          Official has the authority to, on behalf of the Operator, enter into
          the following terms and provide the following consents and
          certifications.
        </li>
        <li>
          The Certifying Official and Operator certify that Certifying Official
          has reviewed the information being submitted, and has exercised due
          diligence to ensure that the information is true and complete, and
          that, to the best of the Certifying Official&apos;s knowledge, the
          information submitted herein is accurate and based on reasonable
          estimates using available data.
        </li>
        <li>
          The Operator agrees to repay any incentive amounts erroneously paid or
          which, upon audit or review by the Province of British Columbia, are
          determined by the Province to be either inconsistent with{' '}
          <a href="https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/cleanbc-program-for-industry/cleanbc-industrial-incentive-program">
            CIIP Rules
          </a>{' '}
          or not supported by evidence related to fuel usage and tax paid, and
          acknowledges that any repayment amount may be deducted from a
          following year&apos;s incentive payment, or other payments due to the
          Operator from the Province.
        </li>
        <li>
          The Operator consents to the release by the Province&apos;s Ministry
          of Finance, to the Ministry of Environment and Climate Change
          Strategy, of information collected in the Operator&apos;s carbon tax
          account(s), and if applicable, other required taxpayer information
          about the Operator, whether supplied by the Operator or by a third
          party, for the purpose of administering GGIRCA. This consent is
          specific to information relating to the two taxation years (April 1st
          to March 31st) prior to the year of this consent and the current
          taxation year and is effective on the date the Representative submits
          this form. The consent will remain in effect for one year.
        </li>
        <li>
          The Operator consents to the release, by government employees
          responsible for administering GGIRCA, to employees, contractors and
          agencies of the Province responsible for administering the CleanBC
          Program for Industry of information contained in emission reports made
          under GGIRCA and submitted in relation to the Reporting Operation, for
          the purposes of administering the CleanBC Program for Industry. This
          consent is specific to emission reports made in respect of the three
          reporting periods prior to the submission of this application and will
          remain in effect for one year.
        </li>
        <li>
          The Operator consents to the release, by government employees
          responsible for administering CleanBC Program for Industry, to
          employees responsible for administering GGIRCA, of information
          contained in this application, for the purposes of administering
          GGIRCA. This consent is specific to this application and will remain
          in effect for one year.
        </li>
        <li>
          The Operator consents to the release, by the Province&apos;s Ministry
          of Environment and Climate Change Strategy to the Ministry of Finance,
          of information contained in this application or in emission reports
          made under GGIRCA and submitted in relation to the Reporting
          Operation, for the purposes of administering the CleanBC Program for
          Industry. This consent is specific to this application and to the
          emission reports made in respect of the three reporting periods prior
          to the submission of this application. This consent will remain in
          effect for one year.
        </li>
        <li>
          The Operator acknowledges that information provided by the Ministry of
          Environment and Climate Change Strategy to the Ministry of Finance may
          be used for the purposes of administering and enforcing the{' '}
          <em>Carbon Tax Act</em>.
        </li>
        <li>
          All information for which consent has been granted will be subject to
          government policies, directives and standards relating to the
          confidentiality of information.
        </li>
        <li>
          The Operator may at any time withdraw its consent under paragraph{' '}
          <strong>d</strong> by submitting a withdrawal of consent in a form
          specified by the Province&apos;s Fuel and Carbon Tax Section. Forms
          may be obtained by submitting a request in writing to the Fuel and
          Carbon Tax Section, Consumer Taxation Programs Branch, Ministry of
          Finance, PO Box 9447 Stn Prov Govt, Victoria BC V8W 9V7.
        </li>
        <li>
          The Operator may at any time withdraw its consent under paragraph{' '}
          <strong>e</strong> or <strong>f</strong> by submitting a withdrawal of
          consent in a form specified by the director appointed under GGIRCA.
          Forms may be obtained by submitting an email request to{' '}
          <a href="mailto:ghgregulator@gov.bc.ca">ghgregulator@gov.bc.ca</a>.
        </li>
        <style jsx global>{`
          ol#glossary {
            list-style-type: none;
            padding-left: 0.5em;
          }
          ol#consents {
            list-style-type: lower-alpha;
          }
        `}</style>
      </ol>
    </>
  );
};

export default LegalDisclaimerText;
