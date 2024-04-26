

import React from 'react';
import './styles.scss';
import { footerlinks } from './constant';

export default function Footer() {
    return (
        <>
            <footer className="footer">
                {footerlinks.map(({ lable, lableChild, socialLink }) => (
                    <div className={`footer-section ${lable === "Mail Us:" ? "footer-section-border" : ""}`}>
                        <h3 className="footer-section-title">{lable}</h3>
                        <p>
                            {lableChild.map(({ lable, link }) => (
                                link ? <><a href={link}>{lable}</a><br /></> : <><span>{lable}</span><br /></>
                            ))}
                        </p>
                        {lable === "Mail Us:" && <><h3 className="footer-section-title">Social</h3>
                            <p>
                                {socialLink.map(({ icon, lable, link }) => (
                                    <><a href={link}>{icon} {lable}</a><br /></>
                                ))}
                            </p>
                        </>}
                    </div>
                ))
                }
            </footer >
            <div className="footer-bottom">
                <span >
                    @Copyright 2024 Built By Ranjana Chaudhary
                </span>
            </div></>
    );
}

