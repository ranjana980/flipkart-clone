import {
    YouTube,
    Facebook,
    Twitter,
} from "@material-ui/icons";

export const footerlinks = [
    {
        lable: 'ABOUT', lableChild: [
            { lable: 'Contact Us', link: '#' },
            { lable: 'About Us', link: '#' },
            { lable: 'Careers', link: '#' },
            { lable: 'Flipkart Stories', link: '#' },
            { lable: 'Press', link: '#' },
            { lable: 'Corporate Information', link: '#' }]
    },
    {
        lable: 'GROUP COMPANIES', lableChild: [{ lable: 'Myntra', link: '#' },
        { lable: 'Flipkart Wholesale', link: '#' },
        { lable: 'Cleartrip', link: '#' },
        { lable: 'Shopshy', link: '#' },]
    },
    {
        lable: 'HELP', lableChild: [{ lable: 'Payments', link: '#' },
        { lable: 'Shipping', link: '#' },
        { lable: 'Cancellation & Returns', link: '#' },
        { lable: 'FAQ', link: '#' },
        { lable: 'Report Infringement', link: '#' },
        ]
    },
    {
        lable: 'CONSUMER POLICY', lableChild: [
            { lable: 'Cancellation & Returns', link: '#' },
            { lable: 'Terms Of Use', link: '#' },
            { lable: 'Security', link: '#' },
            { lable: 'Privacy', link: '#' },
            { lable: 'Sitemap', link: '#' },
            { lable: 'Grievance Redressal', link: '#' },
            { lable: 'EPR Compliance', link: '#' }]
    },
    {
        lable: 'Mail Us:', lableChild: [
            { lable: 'ranjana20@navgurukul.org', link: "mailto:ranjana20@navgurukul.org" },
        ],
        socialLink: [{ icon: <Facebook />, lable: 'FaceBook', link: '#' }, { icon: <Twitter />, lable: 'Twitter', link: '#' }, { icon: <YouTube />, lable: 'Youtube', link: '#' }]

    },
    {
        lable: 'Registered Office Address:', lableChild: [
            { lable: 'Flipkart Internet Private Limited' },
            { lable: 'Buildings Alyssa, Begonia &' },
            { lable: 'Clove Embassy Tech Village,' },
            { lable: 'Outer Ring Road, Devarabeesanahalli Village,' },
            { lable: 'Bengaluru, 560103,' },
            { lable: 'Karnataka, India' },
            { lable: 'CIN : U51109KA2012PTC066107' },
            { lable: 'Telephone: 044-45614700' }]
    }
]