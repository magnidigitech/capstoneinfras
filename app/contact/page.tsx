import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-primary mb-6 text-center">Get in Touch</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-lg">
                Feel free to reach out to us for any inquiries or assistance. We&apos;re here to help you find your perfect space.
            </p>

            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20" />
                            <input type="text" placeholder="Last Name" className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <input type="email" placeholder="Email Address" className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20" />
                        <select className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20 text-gray-500">
                            <option>Project Type</option>
                            <option>Structural Design</option>
                            <option>Audit</option>
                            <option>Testing</option>
                        </select>
                        <textarea placeholder="Tell us about your project..." rows={4} className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-primary/20"></textarea>
                        <button className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-secondary/90 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Head Office</h3>
                        <div className="flex items-start gap-4 text-gray-600">
                            <MapPin className="h-6 w-6 text-secondary shrink-0 mt-1" />
                            <p>Ratnapuri colony, 33-4-316, 4th Ln, Kavitha Nagar,<br />Vengalarao Nagar, Mallikarjunpet, Guntur,<br />Andhra Pradesh 522002</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact Details</h3>
                        <div className="space-y-4 text-gray-600">
                            <div className="flex items-center gap-4">
                                <Phone className="h-6 w-6 text-secondary shrink-0" />
                                <p>+91-8977520918</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-6 w-6 text-secondary shrink-0" />
                                <p>Info.capstoneinfras@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locations Section */}
            <section className="mt-20 text-center">
                <h2 className="text-3xl font-bold text-primary mb-6">Serving Major Cities in Andhra Pradesh</h2>
                <p className="text-gray-600 max-w-4xl mx-auto mb-12">
                    We offer premium house construction services across Major Cities in Andhra Pradesh. Our team specializes in delivering modern, durable, and aesthetically appealing homes tailored to each city&apos;s unique environment and lifestyle.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {["Tirupati", "Vijayawada", "Visakhapatnam", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Anantapur", "Kadapa", "Ongole"].map((city) => (
                        <span key={city} className="px-6 py-2 bg-gray-100 rounded-full text-gray-700 font-semibold hover:bg-primary hover:text-white transition-colors cursor-default">
                            {city}
                        </span>
                    ))}
                </div>
            </section>
        </div>

    );
}
