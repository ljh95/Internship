import React from 'react';
import Select from 'react-select';
import './SelectWorksite.css';

export default function SelectWorksite({
  projectOptions,
  workSiteOptions,
  projectSelectedOption,
  workSiteSelectedOption,
  setProjectSelectedOption,
  setWorkSiteSelectedOption,
}) {
  return (
    <>
      <Select
        value={projectSelectedOption}
        onChange={selectedOption => setProjectSelectedOption(selectedOption)}
        options={projectOptions}
        className="project inline-block"
        placeholder="프로젝트 선택"
      />
      <Select
        value={workSiteSelectedOption}
        onChange={selectedOption => setWorkSiteSelectedOption(selectedOption)}
        options={workSiteOptions}
        className="workSite inline-block"
        placeholder="현장 선택"
      />
    </>
  );
}
