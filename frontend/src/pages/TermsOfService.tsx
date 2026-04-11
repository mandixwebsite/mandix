export default function TermsOfService() {
  return (
    <main className="pt-[100px] pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0d1b2e] mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-blue max-w-none prose-h2:text-[#0d1b2e] prose-h2:font-bold prose-p:text-gray-600 prose-li:text-gray-600">
          <h2>1. Agreement to Terms</h2>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Mandix Consultants ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>

          <h2>2. Professional Services Disclaimer</h2>
          <p>
            The information provided on our website is for general informational purposes only and does not constitute professional advice. While we strive to provide accurate and up-to-date information, the complexities of accounting, tax, and corporate advisory mean that general information may not apply to your specific circumstances.
          </p>
          <p>
            Engaging our firm for consulting or accountancy services requires a separate, written engagement letter signed by both parties, which will detail the specific scope of services, fees, and additional terms and conditions applicable to the professional relationship.
          </p>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.
          </p>

          <h2>4. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that:
          </p>
          <ul>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
          </p>

          <h2>6. Governing Law</h2>
          <p>
            These conditions are governed by and interpreted following the laws of the jurisdiction where Mandix Consultants is registered, and the use of the United Nations Convention of Contracts for the International Sale of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law of your country of residence.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            <br />
            <strong>Email:</strong> mandixconsultants@gmail.com
          </p>
        </div>
      </div>
    </main>
  )
}
