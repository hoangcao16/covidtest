import styled from 'styled-components'
import Sidebar from '../../components/sidebar'
export const StyledSidebar = styled(Sidebar)`
  @media (min-width: 768px) {
    width: 50vw !important;
  }
  .date-picker {
    width: 100%;
    background-color: transparent;
    padding: 8px;
    border: 1px solid #404656;
    border-radius: 4px;
    color: #666;
  }
  .shiftRadio {
    margin-left: 4px;
    margin-right: 1rem;
    padding-top: 6px;
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
