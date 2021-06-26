import { useState, useEffect } from 'react';
import { API } from '../Utils/config';
import isEmptyToken from '../Utils/isEmptyToken';

export default function useProjectWorksiteOption() {
  const [projectOptions, setProjectOptions] = useState([]);
  const [workSiteOptions, setWorkSiteOptions] = useState([]);
  const [projectSelectedOption, setProjectSelectedOption] = useState();
  const [workSiteSelectedOption, setWorkSiteSelectedOption] = useState();
  const [visibleWorkSiteOptions, setVisibleWorkSiteOptions] = useState([]);

  useEffect(() => {
    if (isEmptyToken()) {
      return;
    }
    fetchData(`${API}/projects`);
  }, []);

  const fetchData = async URL => {
    const response = await fetch(URL, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    let data = await response.json();
    data = data.result;

    if (response.ok) {
      let projectOptions = [];
      let workSiteOptions = [];
      data.forEach(project => {
        projectOptions.push({ label: project.name, value: project.project_id });

        project.site.forEach(site => {
          workSiteOptions.push({ label: site.name, value: site.site_id });
        });
      });

      setProjectOptions(projectOptions);
      setWorkSiteOptions(workSiteOptions);
    } else {
      alert(Object.values(data));
    }
  };

  // 프로젝트별 현장 데이터 보여주기
  useEffect(() => {
    if (!projectSelectedOption) return;
    setVisibleWorkSiteOptions(
      workSiteOptions.filter(
        workSite => workSite.project_id === projectSelectedOption.id
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectSelectedOption]);

  useEffect(() => {
    setWorkSiteSelectedOption(visibleWorkSiteOptions[0]);
  }, [visibleWorkSiteOptions]);

  return [
    projectOptions,
    visibleWorkSiteOptions,
    projectSelectedOption,
    workSiteSelectedOption,
    setProjectSelectedOption,
    setWorkSiteSelectedOption,
  ];
}
