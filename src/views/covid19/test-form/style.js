import styled from 'styled-components'
import Sidebar from '../../components/sidebar'
import { Card } from 'reactstrap'
export const StyledTestFormSidebar = styled(Sidebar)`
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
`
export const StyledCard = styled(Card)`
  .add-new-test-form {
    margin-left: 1rem;
  }
  .react-select {
    width: 90%;
    .select__menu .select__menu-list .select__option {
      color: #fff;
    }
    .select__menu .select__menu-list .select__option--is-disabled {
      color: #848e9c;
    }
    .select__menu .select__menu-list .select__option--is-selected,
    .select__menu .select__menu-list .select__option--is-focused {
      color: #fff;
    }
  }
  .ant-table {
    color: #848e9c;
    background-color: #283046;
    font-size: 12px;
    font-weight: 400;
    .ant-table-container {
      border: none;
      min-height: 300px;
      .ant-table-thead > tr > th {
        position: relative;
        color: inherit;
        font-weight: 500;
        text-align: center;
        background: transparent;
        padding: 0;
        border-bottom: 1px solid #3b4253;
      }
      .ant-table-tbody > tr {
        .ant-table-cell-fix-right {
          z-index: 1;
        }
      }
      .ant-table-tbody > tr.ant-table-row:hover > td,
      .ant-table-tbody > tr > td.ant-table-cell-row-hover {
        background: #3b4253;
      }
      .ant-table-tbody > tr > td {
        border-bottom: none;
        padding: 4px 0px;
        .white-color {
          color: #ffffff;
        }
      }
      .ant-table-tbody {
        .ant-table-placeholder {
          .ant-empty-normal {
            color: #ffffff;
          }
          &:hover {
            .ant-table-cell {
              background: #3b4253;
            }
          }
        }
      }
      .ant-table-tbody {
        td.ant-table-column-sort {
          background: #283046;
        }
      }
      .ant-table-tbody > tr.ant-table-row-selected > td {
        background: #3b4253;
      }
    }
  }
  .ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item {
      height: 25px;
      line-height: 22px;
      min-width: 24px;
      a {
        background-color: #283046;
        color: #ffffff;
      }
    }
    .ant-pagination-item-active {
      background: #7367f0;
      border-color: #ffffff;
      a {
        color: #f0b90b !important;
      }
    }
    .ant-pagination-prev > button,
    .ant-pagination-next > button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: #ffffff;
    }
  }
  .ant-table-cell-scrollbar {
    box-shadow: none;
  }
  .ant-table-cell-fix-right {
    background-color: #283046;
  }
  .select-action {
    z-index: 9999;
  }
  .print-test-form {
    margin-right: 1rem;
  }
`
export const StyledTestFormPreview = styled(Sidebar)`
  @media (min-width: 768px) {
    width: 100vw !important;
  }
`
