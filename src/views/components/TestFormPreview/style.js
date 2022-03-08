import Sidebar from '../sidebar'
import styled from 'styled-components'

export const StyledTestFormPreview = styled(Sidebar)`
  @media (min-width: 768px) {
    width: 100vw !important;
  }

  .modal-content {
    padding-bottom: 0 !important;
  }

  .modal-footer {
    padding: 0 0 8px 0 !important;
    justify-content: center;

    .print-button {
      width: 50%;
      height: 40px;
      background-color: #7367f0;
      outline: none;
      border: none;

      &:hover {
        background-color: #6a5cf0;
      }
    }
  }
`
