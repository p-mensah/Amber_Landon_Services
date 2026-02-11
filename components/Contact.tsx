
import React, { useState, useEffect } from 'react';
import AnimatedElement from './AnimatedElement';
import StaticFAQ from './StaticFAQ';
import { services } from '../constants';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type FormFields = {
    name: string;
    email: string;
    serviceType: string;
    origin: string;
    destination: string;
    message: string;
};

const InfoCard: React.FC<{ icon: string; title:string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-5 p-5 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
        <div className="mt-1 text-3xl text-orange-primary dark:text-amber-primary">
            <ion-icon name={icon}></ion-icon>
        </div>
        <div>
            <h3 className="font-poppins font-semibold text-slate-800 dark:text-white">{title}</h3>
            <div className="text-slate-600 dark:text-slate-300">{children}</div>
        </div>
    </div>
);

const ShippingAdviceContent: React.FC = () => (
    <div className="space-y-6 text-slate-600 dark:text-slate-300 p-4">
        <h3 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-white">Expert Shipping Advice</h3>
        <p>Navigating the complexities of global shipping can be daunting. Our experts have compiled some essential tips to ensure your cargo moves smoothly from origin to destination.</p>
        <div>
            <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-200">1. Proper Packaging is Crucial</h4>
            <p>Ensure your goods are securely packaged to withstand the rigors of transit. Use durable materials, adequate cushioning, and clear labeling. For fragile items, consider custom crating solutions.</p>
        </div>
        <div>
            <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-200">2. Understand Incoterms</h4>
            <p>Incoterms (International Commercial Terms) define the responsibilities of sellers and buyers. Familiarize yourself with terms like FOB (Free On Board) and CIF (Cost, Insurance, and Freight) to avoid misunderstandings and unexpected costs.</p>
        </div>
        <div>
            <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-200">3. Choose the Right Freight Mode</h4>
            <p className='font-medium'><strong>Air Freight:</strong> Faster, more reliable, but more expensive. Ideal for high-value or time-sensitive goods.</p>
            <p className='font-medium'><strong>Sea Freight:</strong> More cost-effective for large volumes, but with longer transit times. Best for bulk goods and non-urgent shipments.</p>
        </div>
    </div>
);

const CustomsClearanceContent: React.FC = () => (
    <div className="space-y-6 text-slate-600 dark:text-slate-300 p-4">
        <h3 className="text-2xl font-poppins font-semibold text-slate-800 dark:text-white">Customs Clearance Simplified</h3>
        <p>Customs clearance is a critical step in international shipping. Delays can be costly, so preparation is key.</p>
        <div>
            <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-200">1. Accurate Documentation</h4>
            <p>The most common cause of delays is inaccurate or incomplete paperwork. Ensure your commercial invoice, packing list, and bill of lading are filled out correctly. The HS (Harmonized System) code for your products must be accurate.</p>
        </div>
        <div>
            <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-200">2. Duties and Taxes</h4>
            <p>Be prepared for import duties and taxes. These vary by country and product type. We can help you estimate these costs beforehand to ensure a smooth clearance process.</p>
        </div>
        <div>
            <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-200">3. Restricted and Prohibited Items</h4>
            <p>Every country has a list of items that are restricted or prohibited. Check these regulations carefully before shipping to avoid seizure of your goods and potential fines.</p>
        </div>
    </div>
);


const ContactContent: React.FC = () => {
    const location = "241 North-Gbawe, Residential Area, Accra, Ghana";
    const mapQuery = encodeURIComponent(location);
    
    const [formData, setFormData] = useState<FormFields>({ name: '', email: '', serviceType: 'Air & Sea Cargo', origin: '', destination: '', message: '' });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id } = e.target as { id: keyof FormFields };
        setTouched(prev => ({...prev, [id]: true }));
        validateField(id, formData[id]);
    };

    const validateField = (id: keyof FormFields, value: string) => {
        let errorMsg = '';
        if (!value) {
            if (!['message', 'origin', 'destination'].includes(id)) {
                 errorMsg = `${id.charAt(0).toUpperCase() + id.slice(1)} is required.`;
            }
        } else if (id === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            errorMsg = 'Email is invalid.';
        }
        setErrors(prev => ({ ...prev, [id]: errorMsg }));
    };

    const validateAll = () => {
        const newErrors: Partial<Record<keyof FormFields, string>> = {};
        (Object.keys(formData) as Array<keyof FormFields>).forEach(key => {
            let errorMsg = '';
            if (!formData[key]) {
                 if (!['message', 'origin', 'destination'].includes(key)) {
                    errorMsg = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
                 }
            } else if (key === 'email' && !/\S+@\S+\.\S+/.test(formData[key])) {
                errorMsg = 'Email is invalid.';
            }
            if (errorMsg) newErrors[key] = errorMsg;
        });
        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, serviceType: true, origin: true, destination: true, message: true });
        const validationErrors = validateAll();
        if (Object.keys(validationErrors).length > 0) {
            setStatus('error');
            return;
        }
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', serviceType: 'Air & Sea Cargo', origin: '', destination: '', message: '' });
            setTouched({});
        }, 2000);
    };
    
    useEffect(() => {
        if(status === 'success') {
            const timer = setTimeout(() => setStatus('idle'), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);
    
    return (
         <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2 space-y-6">
               <AnimatedElement animation="fade-in-up">
                   <InfoCard icon="location-outline" title="Our Location">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="hover:text-orange-primary dark:hover:text-amber-primary transition-colors">{location}</a>
                    </InfoCard>
               </AnimatedElement>
               <AnimatedElement animation="fade-in-up" delay="duration-700">
                    <InfoCard icon="call-outline" title="Contact Us">
                        <a href="tel:+233543503649" className="hover:text-orange-primary dark:hover:text-amber-primary transition-colors">+233 543 503 649</a>
                    </InfoCard>
               </AnimatedElement>
                <AnimatedElement animation="fade-in-up" delay="duration-800">
                    <InfoCard icon="mail-open-outline" title="Email Us">
                         <a href="mailto:contact@amberlandon.com" className="hover:text-orange-primary dark:hover:text-amber-primary transition-colors">contact@amberlandon.com</a>
                    </InfoCard>
                </AnimatedElement>
                <AnimatedElement animation="fade-in-up" delay="duration-900">
                     <InfoCard icon="logo-whatsapp" title="WhatsApp">
                        <a href="https://wa.me/233543503649" target="_blank" rel="noopener noreferrer" className="hover:text-orange-primary dark:hover:text-amber-primary transition-colors">Chat with us</a>
                    </InfoCard>
                </AnimatedElement>
                 <AnimatedElement animation="fade-in-up" delay="duration-1000">
                    <div className="h-80 rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700/50">
                        <iframe
                            title="Company Location"
                            src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) opacity(0.8)' }}
                            allowFullScreen={false}
                            aria-hidden="false"
                            tabIndex={0}
                            loading="lazy"
                        ></iframe>
                    </div>
                </AnimatedElement>
            </div>

            <div className="lg:col-span-3">
                <AnimatedElement animation="fade-in-up">
                    <div className="p-8 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 shadow-xl">
                        <h3 className="font-poppins font-semibold text-2xl text-slate-800 dark:text-white mb-6">Request a Free Quote</h3>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="space-y-8">
                                <div className="relative">
                                    <input type="text" id="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${errors.name && touched.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} outline-none focus:border-orange-primary dark:focus:border-amber-primary transition-colors`} required />
                                    <label htmlFor="name" className="absolute left-4 -top-3.5 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-primary dark:peer-focus:text-amber-primary">Your Name*</label>
                                    <div className="h-5"><p className={`text-red-500 text-xs mt-1 transition-all duration-300 ${errors.name && touched.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>{errors.name}</p></div>
                                </div>
                                <div className="relative">
                                    <input type="email" id="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${errors.email && touched.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} outline-none focus:border-orange-primary dark:focus:border-amber-primary transition-colors`} required />
                                    <label htmlFor="email" className="absolute left-4 -top-3.5 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-primary dark:peer-focus:text-amber-primary">Your Email*</label>
                                    <div className="h-5"><p className={`text-red-500 text-xs mt-1 transition-all duration-300 ${errors.email && touched.email ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>{errors.email}</p></div>
                                </div>
                                <div className="relative">
                                    <label htmlFor="serviceType" className="absolute left-4 -top-3.5 text-sm text-slate-500 peer-focus:text-orange-primary dark:peer-focus:text-amber-primary">Service Required*</label>
                                    <select id="serviceType" value={formData.serviceType} onChange={handleChange} onBlur={handleBlur} className={`peer w-full px-4 py-3 bg-white dark:bg-slate-800 border-b-2 ${errors.serviceType && touched.serviceType ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} outline-none focus:border-orange-primary dark:focus:border-amber-primary transition-colors rounded-t-md`}>
                                        {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                                    </select>
                                    <div className="h-5"><p className={`text-red-500 text-xs mt-1 transition-all duration-300 ${errors.serviceType && touched.serviceType ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>{errors.serviceType}</p></div>
                                </div>
                                 <div className="grid sm:grid-cols-2 gap-8">
                                    <div className="relative">
                                        <input type="text" id="origin" value={formData.origin} onChange={handleChange} onBlur={handleBlur} className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${errors.origin && touched.origin ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} outline-none focus:border-orange-primary dark:focus:border-amber-primary transition-colors`} />
                                        <label htmlFor="origin" className="absolute left-4 -top-3.5 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-primary dark:peer-focus:text-amber-primary">Shipment Origin</label>
                                    </div>
                                    <div className="relative">
                                        <input type="text" id="destination" value={formData.destination} onChange={handleChange} onBlur={handleBlur} className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${errors.destination && touched.destination ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} outline-none focus:border-orange-primary dark:focus:border-amber-primary transition-colors`} />
                                        <label htmlFor="destination" className="absolute left-4 -top-3.5 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-primary dark:peer-focus:text-amber-primary">Shipment Destination</label>
                                    </div>
                                </div>
                                <div className="relative">
                                    <textarea id="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} rows={3} className={`peer w-full px-4 py-3 bg-transparent border-b-2 ${errors.message && touched.message ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} outline-none focus:border-orange-primary dark:focus:border-amber-primary transition-colors resize-none`} ></textarea>
                                    <label htmlFor="message" className="absolute left-4 -top-3.5 text-sm text-slate-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-orange-primary dark:peer-focus:text-amber-primary">Additional Details</label>
                                </div>
                                <div aria-live="polite" className="h-6 text-center transition-all duration-300">
                                    {status === 'success' && <p className="text-emerald-accent">Quote request sent successfully!</p>}
                                    {status === 'error' && Object.keys(errors).length === 0 && <p className="text-red-500">An unknown error occurred. Please try again.</p>}
                                </div>
                                <button type="submit" disabled={status === 'sending'} className="w-full text-white font-poppins font-semibold py-4 px-8 rounded-full bg-gradient-to-r from-orange-primary to-amber-primary hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-orange-primary/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
                                    {status === 'sending' ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</>) : 'Submit Quote Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </AnimatedElement>
            </div>
        </div>
    );
};


type Tab = 'FAQ' | 'Shipping Advice' | 'Customs Clearance' | 'Contact';

const HelpAndSupport: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('FAQ');
    const tabs: Tab[] = ['FAQ', 'Shipping Advice', 'Customs Clearance', 'Contact'];

    const renderContent = () => {
        switch (activeTab) {
            case 'FAQ':
                return <StaticFAQ showTitle={false} className="!mt-0" />;
            case 'Shipping Advice':
                return <ShippingAdviceContent />;
            case 'Customs Clearance':
                return <CustomsClearanceContent />;
            case 'Contact':
                return <ContactContent />;
            default:
                return null;
        }
    };
    
    return (
        <section id="help-and-support" className="py-20 lg:py-32 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-purple-accent/10 dark:to-purple-accent/20"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedElement className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-slate-900 dark:text-white">
                        Help & <span className="bg-gradient-to-r from-orange-primary to-amber-primary gradient-text">Support</span>
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
                        Your questions answered. Expert advice at your fingertips.
                    </p>
                </AnimatedElement>

                {/* Tab Navigation */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 rounded-full bg-slate-200/50 dark:bg-slate-800/50">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full sm:w-auto flex-1 sm:flex-initial text-center px-6 py-3 rounded-full text-sm font-poppins font-semibold transition-all duration-300
                                ${activeTab === tab 
                                    ? 'bg-gradient-to-r from-orange-primary to-amber-primary text-white shadow-md' 
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'}`
                                }
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatedElement key={activeTab} animation="fade-in">
                    <div className="p-0 md:p-8 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-200 dark:border-slate-700/50 shadow-xl min-h-[400px]">
                        {renderContent()}
                    </div>
                </AnimatedElement>
            </div>
        </section>
    );
};

export default HelpAndSupport;
