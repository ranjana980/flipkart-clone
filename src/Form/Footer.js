import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import AddCallIcon from '@material-ui/icons/AddIcCall';
export default function footer() {
    return (
        <div className="footer">
            <div className="grid grid-cols-12">

                <div className='lg:col-span-2 col-span-12'>
                    <h3 className='font-mono text-blue-600 italic   mb-2 font-bold'>E-Commerce</h3>
                    <ul>
                        <li className='flex text-white p-1'> <AddCallIcon className='text-green-900'/><span className='text-sm ml-2'>+916307108245</span>
                        </li>
                        <li className='flex text-white p-1'>
                            <EmailIcon className='text-orange-700' />
                            <span className='text-sm ml-2'>rc6307108245@gmail.com</span>
                        </li>
                        <li><div className='flex bg-gray-300 w-48 mt-3 content-between p-1 rounded-lg'>
                            <FacebookIcon className='text-blue-900 ml-3' />
                            <LinkedInIcon className='text-blue-900 ml-3' />
                            <TwitterIcon className='text-blue-900 ml-3' />
                            <InstagramIcon className='text-red-900 ml-3' />
                            <YouTubeIcon className='text-red-600 ml-3' />
                        </div></li>
                    </ul>
                </div>
                <div className="lg:col-span-2 col-span-12 text-white text-start">
                    <ul
                    >
                        <h6 className="text-gray-400 mb-3">ABOUT</h6>
                        <li className="leading-6 text-sm">Contact Us</li>
                        <li className="leading-6 text-sm">About Us</li>
                        <li className="leading-6 text-sm">PressS</li>
                        <li className="leading-6 text-sm">Corporate Information</li>
                    </ul>
                </div>

                <div className="lg:col-span-2 col-span-12 text-white text-start">

                    <ul
                    >
                        <h6 className="text-gray-400 mb-3">HELP</h6>
                        <li className="leading-6 text-sm">Payment</li>
                        <li className="leading-6 text-sm">Shipping</li>
                        <li className="leading-6 text-sm">Cancellation & Returns</li>
                        <li className="leading-6 text-sm">FAQ</li>
                    </ul>
                </div>
                <div className="lg:col-span-2 col-span-12 text-white text-start">

                    <ul
                    >
                        <h6 className="text-gray-400 mb-3">POLICY</h6>
                        <li className="leading-6 text-sm">Return Policy</li>
                        <li className="leading-6 text-sm">Terms Of Use</li>
                        <li className="leading-6 text-sm">Security</li>
                        <li className="leading-6 text-sm">Privacy</li>
                        <li className="leading-6 text-sm">Sitemap</li>
                        <li className="leading-6 text-sm">EPR Compliance</li>
                    </ul>
                </div>
                <div className="lg:col-span-2 col-span-12 text-white text-start">

                    <ul
                    >
                        <h6 className="text-gray-400 mb-3">SOCIAL</h6>
                        <li className="leading-6 text-sm">Facebook</li>
                        <li className="leading-6 text-sm">Linkdine</li>
                        <li className="leading-6 text-sm">Twitter</li>
                        <li className="leading-6 text-sm">Instagram</li>
                        <li className="leading-6 text-sm">YouTube</li>
                    </ul>
                </div>
                <div className="lg:col-span-2 col-span-12 text-white text-start">

                    <ul
                    >
                        <h6 className="text-gray-400 mb-3">ADDRESS</h6>
                        <li className="leading-6 text-sm">Sudha Petrol Pump Road, <br />Near Chandra Dev Kanya Mahadev Vidyalaya, Vijayant Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010</li>
                    </ul>
                </div>
            </div>

            <div className="row">
                <h5 className="h-15 bg-blue-600  text-start p-3" style={{ color: 'white' }}>@Copyright 2022 Built By Ranjana Chaudhary</h5>
            </div>
        </div>
    )
}