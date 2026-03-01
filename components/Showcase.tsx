import React from 'react';
import { motion } from 'framer-motion';
import ResponsivePicture from './ResponsivePicture';

// 1. For everyone
// @ts-ignore
import forEveryoneDesktop from './Assets/images-compressed/FOR-EVERYONE.jpg';
// @ts-ignore
import forEveryoneTablet from './Assets/images-compressed/FOR-EVERYONE-TABLET.jpg';
// @ts-ignore
import forEveryoneMobile from './Assets/images-compressed/FOR-EVERYONE-MOBILE.jpg';

// 2. Selective Shield
// @ts-ignore
import selectiveShieldDesktop from './Assets/images-compressed/SELECTIVE-SHIELD.jpg';
// @ts-ignore
import selectiveShieldTablet from './Assets/images-compressed/SELECTIVE-SHIELD-TABLET.jpg';
// @ts-ignore
import selectiveShieldMobile from './Assets/images-compressed/SELECTIVE-SHIELD-MOBILE.jpg';

// 3. Invisible
// @ts-ignore
import invisibleDesktop from './Assets/images-compressed/INVISIBLE.jpg';
// @ts-ignore
import invisibleTablet from './Assets/images-compressed/INVISIBLE-TABLET.jpg';
// @ts-ignore
import invisibleMobile from './Assets/images-compressed/INVISIBLE-PHONE-2.jpg';

const Showcase: React.FC = () => {
    return (
        <>
            {/* 1. For everyone */}
            <section className="bg-[#082230] min-h-[100dvh] w-full relative flex items-center justify-center snap-start overflow-hidden">
                {/* Full Background Image */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    <ResponsivePicture
                        desktopSrc={forEveryoneDesktop}
                        tabletSrc={forEveryoneTablet}
                        mobileSrc={forEveryoneMobile}
                        alt="Business professionals shaking hands"
                        className="w-full h-full block"
                        imgClassName="w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out"
                    />
                </div>

                {/* Centered Text underneath the handshake */}
                <div className="relative z-10 w-full max-w-3xl px-gr-1 flex flex-col items-center text-center mt-[25vh] md:mt-[15vh] xl:mt-[25vh]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="font-mono text-[10px] md:text-[14px] xl:text-body2 tracking-[0.2em] text-[#E5E5E5]/60 uppercase mb-6 md:mb-8 xl:mb-6 font-medium">
                            All Inclusive
                        </p>
                        <h2 className="font-sans text-h2 text-white tracking-tight mb-6 md:mb-8">
                            For everyone.
                        </h2>
                        <p className="font-sans text-body1 text-[#F5F5F5]/90 max-w-[320px] md:max-w-[480px] font-medium mx-auto">
                            <span className="md:hidden">
                                A flexible, breathable polyimide<br />
                                architecture enables comfortable,<br />
                                long-term wear, ensuring data is<br />
                                tracked across days, not just moments.
                            </span>
                            <span className="hidden md:inline xl:hidden">
                                A flexible, breathable polyimide architecture<br />
                                enables comfortable, long-term wear, ensuring<br />
                                data is tracked across days, not just moments.
                            </span>
                            <span className="hidden xl:inline">
                                A flexible, breathable polyimide architecture enables comfortable, long-term wear, ensuring data is tracked across days, not just moments.
                            </span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Selective Shield */}
            <section className="bg-[#082230] min-h-[100dvh] w-full relative flex items-start pt-[20vh] md:pt-[25vh] lg:pt-[28vh] snap-start overflow-hidden">
                {/* Full Background Image */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    <ResponsivePicture
                        desktopSrc={selectiveShieldDesktop}
                        tabletSrc={selectiveShieldTablet}
                        mobileSrc={selectiveShieldMobile}
                        alt="Diver jumping into the ocean"
                        className="w-full h-full block"
                        imgClassName="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
                    />
                </div>

                {/* Text Container aligned to the left side per reference screenshot */}
                <div className="w-full max-w-[1440px] mx-auto px-gr-1 md:px-gr-2 lg:px-gr-3 xl:px-gr-4 flex justify-start relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-[80%] xl:w-1/2 flex flex-col items-start text-left"
                    >
                        <p className="font-mono text-[10px] md:text-[14px] xl:text-[11px] tracking-[0.2em] text-[#E5E5E5]/60 uppercase mb-4 md:mb-6 xl:mb-4">
                            Adaptability
                        </p>
                        <h2 className="font-sans text-h2 text-white tracking-tight mb-6 md:mb-8 xl:mb-6">
                            Selective Shield.
                        </h2>
                        <p className="font-sans font-normal text-body1 text-[#F5F5F5]/90 max-w-[340px] md:max-w-[480px]">
                            <span className="md:hidden">
                                The outer surface is hydrophobic -<br />
                                it pushes water away. The inner<br />
                                mesh is hydrophilic - it pulls sweat<br />
                                in. Whether you are swimming or<br />
                                showering, the sensor only reads you.
                            </span>
                            <span className="hidden md:inline xl:hidden">
                                The outer surface is hydrophobic - it pushes<br />
                                water away. The inner mesh is hydrophilic - it<br />
                                pulls sweat in. Whether you are swimming or<br />
                                showering, the sensor only reads you.
                            </span>
                            <span className="hidden xl:inline">
                                The outer surface is hydrophobic - it pushes water away. The inner mesh is hydrophilic - it pulls sweat in. Whether you are swimming or showering, the sensor only reads you.
                            </span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. Invisible */}
            <section className="bg-[#082230] min-h-[100dvh] w-full relative flex items-start pt-[8vh] md:pt-[10vh] lg:pt-[12vh] snap-start overflow-hidden">
                {/* Full Background Image */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    <ResponsivePicture
                        desktopSrc={invisibleDesktop}
                        tabletSrc={invisibleTablet}
                        mobileSrc={invisibleMobile}
                        alt="Person sleeping peacefully"
                        className="w-full h-full block"
                        imgClassName="w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
                    />
                </div>

                {/* Text Container centered on top half for tablet, aligned right on desktop */}
                <div className="w-full max-w-[1440px] mx-auto px-gr-1 md:px-gr-2 xl:px-gr-3 flex justify-start md:justify-center xl:justify-end relative z-10 pt-[8vh] md:pt-[5vh]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-[60%] xl:w-[45%] flex flex-col items-start text-left"
                    >
                        <p className="font-mono text-[10px] md:text-[14px] xl:text-[11px] tracking-[0.2em] text-[#F5F5F5]/60 uppercase mb-4 md:mb-6 xl:mb-4">
                            The Form
                        </p>
                        <h2 className="font-sans text-h2 text-white tracking-tight mb-6 md:mb-8 xl:mb-6">
                            Invisible.
                        </h2>
                        {/* More constricting max-width specifically tuned to force exactly 4 lines of text wrapping */}
                        <p className="font-sans font-normal text-body1 text-white/90 max-w-[340px] md:max-w-[440px] xl:max-w-[390px]">
                            <span className="md:hidden">
                                We built VION on a sheet of<br />
                                polyimide - the same material<br />
                                used in space suits. It's flexible &<br />
                                breathable, conforms to your arm<br />
                                like a second skin. You put it on,<br />
                                and then you forget it exists.
                            </span>
                            <span className="hidden md:inline xl:hidden">
                                We built VION on a sheet of polyimide - the<br />
                                same material used in space suits. It's flexible &<br />
                                breathable, conforms to your arm like a second<br />
                                skin. You put it on, and then you forget it exists.
                            </span>
                            <span className="hidden xl:inline">
                                We built VION on a sheet of polyimide - the same material used in space suits. It's flexible & breathable, conforms to your arm like a second skin. You put it on, and then you forget it exists.
                            </span>
                        </p>
                    </motion.div>
                </div>
            </section>

        </>
    );
};

export default Showcase;
