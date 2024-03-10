import React from 'react';
import { Select } from 'antd';
import '../../i18n';
import { availableLanguages } from "../../i18n";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SelectLang: React.FC = () => {
  const { i18n } = useTranslation();

  const getOptionsLang = () => {
    return availableLanguages.map((lang, k) => {
      return <Option key={k} value={lang.symbol}>{lang.display}</Option>
    });
  }

  return (
    <div className='w-100'>
      <div className='float-end'>
        <Select defaultValue={i18n.language} onChange={(lang) => i18n.changeLanguage(lang)}>
          {getOptionsLang()}
        </Select>
      </div>
      <br />
    </div>
  );
};

export default SelectLang;