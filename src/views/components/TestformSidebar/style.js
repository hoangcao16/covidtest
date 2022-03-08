import styled from 'styled-components'
import Sidebar from '../sidebar'
export const StyledTestFormSidebar = styled(Sidebar)`
  .card-header {
    padding: 0.5rem 0.5rem;
  }

  @media (min-width: 768px) {
    width: 70vw !important;
  }

  .date-picker {
    width: 100%;
    background-color: transparent;
    padding: 8px;
    border: 1px solid #404656;
    border-radius: 4px;
    color: #666;
  }

  .shiftRadio,
  .sampletypecheckbox {
    margin-left: 4px;
    margin-right: 1rem;
  }

  .sampletype {
    div {
      button {
        width: 100%;
        background-color: transparent;
        border: 1px solid #404656;
      }
    }
  }

  .group-button {
    padding-top: 1rem;
    text-align: center;
  }

  .react-select {
    flex: 1;
  }

  .add-patient-button {
    margin-left: 8px;
  }

  .groupshift {
    width: 100%;
  }

  .select__control .select__multi-value .select__multi-value__label {
    color: #f0f0f0;
  }

  .select__control .select__multi-value__remove svg {
    fill: #f06767;
  }

  #takeSampleTime,
  #receiveSampleTime,
  #performTime,
  #returnTime {
    color: #b4b7bd;
  }
  .countPrice {
    margin-left: 4px;
    min-width: 100px;
  }
`
