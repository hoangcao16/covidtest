import {Mail, Home, Circle, Camera, Command, Cpu, Dribbble, Slack} from 'react-feather'

export default [
    {
        id: 'patients',
        title: 'Khách Hàng',
        icon: <Home size={20}/>,
        navLink: '/patients'
    },
    {
        id: 'covid19',
        title: 'Xét nghiệm Covid-19',
        icon: <Command size={20}/>,
        navLink: '/covid19',
        children: [
            {
                id: 'test-form',
                title: 'Phiếu Xét Nghiệm',
                icon: <Circle size={12}/>,
                navLink: '/covid19/test-form'
            },
            {
                id: 'money-form',
                title: 'Phiếu Thu',
                icon: <Circle size={12}/>,
                navLink: '/covid19/money-form'
            },
            {
                id: 'result-form',
                title: 'Phiếu Trả Kết Quả',
                icon: <Circle size={12}/>,
                navLink: '/covid19/result-form'
            }
        ]
    },

    {
        id: 'entities',
        title: 'Danh mục',
        icon: <Dribbble size={20}/>,
        navLink: '/entities',
        children: [
            {
                id: 'technical-type',
                title: 'Loại kỹ thuật',
                icon: <Circle size={12}/>,
                navLink: '/entities/technical-type'
            },
            {
                id: 'sample-type',
                title: 'Mẫu bệnh phẩm',
                icon: <Circle size={12}/>,
                navLink: '/entities/sample-type'
            },
            {
                id: 'agency',
                title: 'Đơn vị',
                icon: <Circle size={12}/>,
                navLink: '/entities/agency'
            }
        ]
    },
    {
        id: 'loans',
        title: 'Công nợ',
        icon: <Cpu size={20}/>,
        navLink: '/loans',
        children: []
    },
    {
        id: 'reports',
        title: 'Báo cáo',
        icon: <Camera size={20}/>,
        navLink: '/reports',
        children: [

            {
                id: 'loans',
                title: 'Công nợ',
                icon: <Circle size={12}/>,
                navLink: '/reports/loans'
            },
            {
                id: 'revenue',
                title: 'Doanh thu',
                icon: <Circle size={12}/>,
                navLink: '/reports/revenue'
            }
        ]
    },
    {
        id: 'settings',
        title: 'Cấu hình',
        icon: <Slack size={20}/>,
        navLink: '/accounts',
        children: [
            {
                id: 'accounts',
                title: 'Người dùng',
                icon: <Circle size={12}/>,
                navLink: '/settings/accounts'
            },
            {
                id: 'language',
                title: 'Ngôn ngữ',
                icon: <Circle size={12}/>,
                navLink: '/settings/accounts'
            },
            {
                id: 'invoicePreview',
                title: 'Nội dung phiếu thu',
                icon: <Circle size={12}/>,
                navLink: '/settings/fdfd'
            }
        ]
    }
]