import styled from 'styled-components'
import Sidebar from '../../components/sidebar'
import { Card } from 'reactstrap'
export const StyledSidebar = styled(Sidebar)`
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
`
export const StyledCard = styled(Card)`
  .add-new-test-form {
    margin-left: 1rem;
  }
  .react-dataTable {
    div {
    }
  }
  .react-select {
    width: 100%;
  }
`
