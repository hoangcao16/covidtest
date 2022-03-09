import { Card } from 'reactstrap'
import styled from 'styled-components'
export const StyledAddNewCard = styled(Card)`
  padding: 8px 16px;
  .card-header {
    padding: 1rem 0;
  }
  form {
    margin: 1rem 0;
  }
  .react-select {
    flex: 1;
  }
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`
