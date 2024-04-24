import ViFlag from '../../assets/Flag_of_Vietnam.svg.webp';
import EnFlag from '../../assets/Flag_of_the_United_Kingdom_(1-2).svg.png';
import './ChooseLanguage.scss';

import { useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { doChangeLanguage } from '../../redux/action/userAction';

const ChooseLanguage = () => {

    const languageRedux = useSelector(state => state.language);
    const dispatch = useDispatch();


    const [language, setLanguage] = useState(languageRedux);
    const [chooseLanguage, setChooseLanguage] = useState(false);
    const { t, i18n } = useTranslation();


    useEffect(() => {
        i18n.changeLanguage(language);
        dispatch(doChangeLanguage(language));
        console.log('languageRedux', languageRedux);
    }, [language]);

    return (
        <div className="choose-language">
            <div className='absolute-div'>


                {
                    chooseLanguage === false && language === 'vi' ?
                        <div
                            className="choose-language__item"
                            onClick={() => setChooseLanguage(true)}
                        >
                            <div className='img-contain'><img src={ViFlag} alt="vi" /> </div>
                            <span> vi</span>
                        </div>
                        :
                        chooseLanguage === false && language === 'en' ?
                            <div
                                className="choose-language__item"
                                onClick={() => setChooseLanguage(true)}
                            >
                                <div className='img-contain'><img src={EnFlag} alt="en" /> </div>
                                <span> en</span>
                            </div>
                            : <></>
                }
                {chooseLanguage && language === 'vi' ?
                    <>
                        <div
                            className="choose-language__item bg-aquarium"
                            onClick={() => { setLanguage('vi'); setChooseLanguage(false) }}
                        >
                            <div className='img-contain'><img src={ViFlag} alt="vi" /> </div>
                            <span> vi</span>
                        </div>
                        <div
                            className="choose-language__item bg-aquarium"
                            onClick={() => { setLanguage('en'); setChooseLanguage(false) }}
                        >
                            <div className='img-contain'><img src={EnFlag} alt="en" /> </div>
                            <span> en</span>
                        </div>
                    </>
                    : chooseLanguage && language === 'en' ?

                        <>
                            <div
                                className="choose-language__item bg-aquarium"
                                onClick={() => { setLanguage('en'); setChooseLanguage(false) }}
                            >
                                <div className='img-contain'><img src={EnFlag} alt="en" /> </div>
                                <span> en</span>
                            </div>
                            <div
                                className="choose-language__item bg-aquarium"
                                onClick={() => { setLanguage('vi'); setChooseLanguage(false) }}
                            >
                                <div className='img-contain'><img src={ViFlag} alt="vi" /> </div>
                                <span> vi</span>
                            </div>
                        </>
                        : <></>
                }

            </div>
        </div >
    );
}
export default ChooseLanguage;