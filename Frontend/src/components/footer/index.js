

import React from 'react';
import './styles.scss';
import { footerlinks } from './constant';
import { useSelector } from 'react-redux';

export default function Footer() {
    const { user } = useSelector((state) => state.auth)
    return (
        <>

            {user?.role === 'user' && <footer className="footer ">
                {footerlinks.map(({ lable, lableChild, socialLink }) => (
                    <div className={`footer-section ${lable === "Mail Us:" ? "footer-section-border" : ""}`}>
                        <h3 className="footer-section-title">{lable}</h3>
                        <p>
                            {lableChild.map(({ lable, link }) => (
                                link ? <><a className='!text-white' href={link}>{lable}</a><br /></> : <><span>{lable}</span><br /></>
                            ))}
                        </p>
                        {lable === "Mail Us:" && <><h3 className="footer-section-title">Social</h3>
                            <p>
                                {socialLink.map(({ icon, lable, link }) => (
                                    <><a className='!text-white' href={link}>{icon} {lable}</a><br /></>
                                ))}
                            </p>
                        </>}
                    </div>
                ))
                }
            </footer >}
            <div className="footer-bottom fixed w-100">
                <span >
                    @Copyright 2024 Built By Ranjana Chaudhary
                </span>
            </div>
        </>
    );
}

