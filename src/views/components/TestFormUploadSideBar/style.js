import styled from 'styled-components'
import Sidebar from '../sidebar'
export const StyledTestFormUploadCSV = styled(Sidebar)`
  @media (min-width: 768px) {
    width: 80vw !important;
  }

  .patients {
    height: 50vh;

    .patient {
      display: flex;
      justify-content: left;
      align-items: center;
      border: 1px solid whitesmoke;

      &-item {
        width: 8%;
      }
    }
  }
`
