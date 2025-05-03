export default function CartItem() {
    return <>
        <div className="border-b border-[lightgrey] ">
            <div className="bg-white  p-4 mb-5">
                <div className=" flex justify-center " >  <img src="https://rukminim2.flixcart.com/www/400/400/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" /></div>
                <h5>Missing Cart Items?</h5>
                <p>Login to see the items you added previously</p>
                <button className="bg-[#fb641b] text-white p-2 w-[12%]">Login</button></div>
        </div>
        <div className="pt-3 mb-64 mx-5 text-[grey] flex justify-between item">
            <div className="flex gap-2 " >
                <div className="border-r border-[grey] pr-2">Policies:Returns Policy</div><div className="border-r border-[grey] pr-2">Terms of use</div><div className="border-r border-[grey] pr-2">Security</div>
                <div >Privacy</div><div className="ml-5">© 2007-2025 Flipkart.com</div>
            </div>
            <div> Need help? Visit the Help Center or Contact Us</div>
        </div>
    </>
}