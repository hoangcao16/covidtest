/* eslint-disable multiline-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable semi */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
import {Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {StyledTestFormUploadCSV} from "./style";
import CSVReader from "react-csv-reader";

const defaultValues = {}

const defaultFileList = [
    {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
    },
    {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
    },
    {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
    },
]

const TestFromUploadCSV = ({openSideBar, toggleTestFormSidebar}) => {
    const handleForce = (data, fileInfo) => {

        console.log('handleForce:', data, fileInfo);
    }

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };
    return (
        <StyledTestFormUploadCSV
            size='lg'
            open={openSideBar}
            title='Upload CSV'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleTestFormSidebar}
        >
            <Upload>
                <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV with secret Death Star statistics"
                    onFileLoaded={handleForce}
                    parserOptions={papaparseOptions}
                />
            </Upload>
        </StyledTestFormUploadCSV>
    )
}

export default TestFromUploadCSV
