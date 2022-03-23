import styled from 'styled-components'
import Sidebar from '../../../components/sidebar'
export const StyledDetailSidebar = styled(Sidebar)`
  text-align: center;
  .detail {
    text-align: start;
    margin-top: 2rem;
  }
  @media (min-width: 768px) {
    width: 70vw !important;
  }
  .group-button {
    padding-top: 2rem;
    text-align: center;
  }
`
