import React from 'react';
import SelectWorksite from '../Molecules/SelectWorksite';

export default function DashBoardOptionSection({
  projectOptions,
  visibleWorkSiteOptions,
  projectSelectedOption,
  workSiteSelectedOption,
  setProjectSelectedOption,
  setWorkSiteSelectedOption,
}) {
  return (
    <div className="dashboard-filter">
      <SelectWorksite
        projectOptions={projectOptions}
        workSiteOptions={visibleWorkSiteOptions}
        projectSelectedOption={projectSelectedOption}
        workSiteSelectedOption={workSiteSelectedOption}
        setProjectSelectedOption={setProjectSelectedOption}
        setWorkSiteSelectedOption={setWorkSiteSelectedOption}
      />
      {/* <ButtonBundle
        contentPair={['현장 수정', '새 현장 추가']}
        cnPair={['btn btn-secondary', 'btn btn-primary']}
        clickHandlerPair={[() => {}, () => {}]}
      /> */}
    </div>
  );
}
