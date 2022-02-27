import styled from 'styled-components'
import Sidebar from '../../components/sidebar'
export const StyledSidebar = styled(Sidebar)`
  @media (min-width: 768px) {
    width: 50rem !important;
  }
  .date-picker {
    width: 100%;
    background-color: transparent;
    padding: 8px;
    border: 1px solid #404656;
    border-radius: 4px;
    color: #666;
  }
  .form-control-shift {
    display: flex;
    align-items: center;
  }
  .shiftRadio {
    margin-left: 4px;
    margin-right: 1rem;
    padding-top: 6px;
  }
`
