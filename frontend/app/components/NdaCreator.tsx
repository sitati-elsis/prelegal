'use client'

import { useState, useRef } from 'react'

interface Party {
  company: string
  printName: string
  title: string
  noticeAddress: string
}

interface NdaFormData {
  purpose: string
  effectiveDate: string
  mndaTermType: 'expires' | 'continues'
  mndaTermYears: number
  confidentialityTermType: 'years' | 'perpetuity'
  confidentialityTermYears: number
  governingLaw: string
  jurisdiction: string
  party1: Party
  party2: Party
}

const today = new Date().toISOString().split('T')[0]

const defaultValues: NdaFormData = {
  purpose: 'Evaluating whether to enter into a business relationship with the other party.',
  effectiveDate: today,
  mndaTermType: 'expires',
  mndaTermYears: 1,
  confidentialityTermType: 'years',
  confidentialityTermYears: 1,
  governingLaw: '',
  jurisdiction: '',
  party1: { company: '', printName: '', title: '', noticeAddress: '' },
  party2: { company: '', printName: '', title: '', noticeAddress: '' },
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '[Effective Date]'
  const [year, month, day] = dateStr.split('-')
  const d = new Date(Number(year), Number(month) - 1, Number(day))
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function mndaTermLabel(data: NdaFormData): string {
  if (data.mndaTermType === 'expires') {
    return `${data.mndaTermYears} year${data.mndaTermYears !== 1 ? 's' : ''} from Effective Date`
  }
  return 'continues until terminated in accordance with the terms of the MNDA'
}

function confidentialityTermLabel(data: NdaFormData): string {
  if (data.confidentialityTermType === 'years') {
    return `${data.confidentialityTermYears} year${data.confidentialityTermYears !== 1 ? 's' : ''} from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws`
  }
  return 'in perpetuity'
}

function generateMarkdown(data: NdaFormData): string {
  const p1 = data.party1
  const p2 = data.party2
  const effectiveDateFormatted = formatDate(data.effectiveDate)

  return `# Mutual Non-Disclosure Agreement

## USING THIS MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1) this Cover Page ("**Cover Page**") and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 ("**Standard Terms**") identical to those posted at [commonpaper.com/standards/mutual-nda/1.0](https://commonpaper.com/standards/mutual-nda/1.0). Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.

### Purpose
${data.purpose}

### Effective Date
${effectiveDateFormatted}

### MNDA Term
- [${data.mndaTermType === 'expires' ? 'x' : ' '}]  Expires ${data.mndaTermYears} year${data.mndaTermYears !== 1 ? 's' : ''} from Effective Date.
- [${data.mndaTermType === 'continues' ? 'x' : ' '}]  Continues until terminated in accordance with the terms of the MNDA.

### Term of Confidentiality
- [${data.confidentialityTermType === 'years' ? 'x' : ' '}]  ${data.confidentialityTermYears} year${data.confidentialityTermYears !== 1 ? 's' : ''} from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.
- [${data.confidentialityTermType === 'perpetuity' ? 'x' : ' '}]  In perpetuity.

### Governing Law & Jurisdiction
Governing Law: ${data.governingLaw || '[Fill in state]'}

Jurisdiction: ${data.jurisdiction || '[Fill in city or county and state]'}

### MNDA Modifications
None.

By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.

|| PARTY 1 | PARTY 2 |
|:--- | :----: | :----: |
| Signature | | |
| Print Name | ${p1.printName || ''} | ${p2.printName || ''} |
| Title | ${p1.title || ''} | ${p2.title || ''} |
| Company | ${p1.company || ''} | ${p2.company || ''} |
| Notice Address | ${p1.noticeAddress || ''} | ${p2.noticeAddress || ''} |
| Date | | |

---

# Standard Terms

1. **Introduction**. This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) ("**MNDA**") allows each party ("**Disclosing Party**") to disclose or make available information in connection with the ${data.purpose} which (1) the Disclosing Party identifies to the receiving party ("**Receiving Party**") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("**Confidential Information**"). Each party's Confidential Information also includes the existence and status of the parties' discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating these Standard Terms ("**Cover Page**"). Each party is identified on the Cover Page and capitalized terms have the meanings given herein or on the Cover Page.

2. **Use and Protection of Confidential Information**. The Receiving Party shall: (a) use Confidential Information solely for the ${data.purpose}; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the ${data.purpose}, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.

3. **Exceptions**. The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.

4. **Disclosures Required by Law**. The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.

5. **Term and Termination**. This MNDA commences on the ${effectiveDateFormatted} and expires at the end of the ${mndaTermLabel(data)}. Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party's obligations relating to Confidential Information will survive for the ${confidentialityTermLabel(data)}, despite any expiration or termination of this MNDA.

6. **Return or Destruction of Confidential Information**. Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.

7. **Proprietary Rights**. The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.

8. **Disclaimer**. ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.

9. **Governing Law and Jurisdiction**. This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of ${data.governingLaw || '[Governing Law]'}, without regard to the conflict of laws provisions of such ${data.governingLaw || '[Governing Law]'}. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in ${data.jurisdiction || '[Jurisdiction]'}. Each party irrevocably submits to the exclusive jurisdiction of such ${data.jurisdiction || '[Jurisdiction]'} in any such suit, action, or proceeding.

10. **Equitable Relief**. A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.

11. **General**. Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. Waivers must be signed by the waiving party's authorized representative and cannot be implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of which is deemed an original and which together form the same agreement.

Common Paper Mutual Non-Disclosure Agreement [Version 1.0](https://commonpaper.com/standards/mutual-nda/1.0/) free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
    />
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-6 mb-3 border-b pb-1">{children}</h3>
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="bg-yellow-100 text-yellow-900 rounded px-0.5">{children}</span>
}

function NdaPreview({ data }: { data: NdaFormData }) {
  const p1 = data.party1
  const p2 = data.party2
  const effectiveDateFormatted = formatDate(data.effectiveDate)

  const val = (s: string, fallback: string) => s.trim() ? s : fallback

  return (
    <div className="font-serif text-sm leading-relaxed text-gray-900 print-page">
      <h1 className="text-xl font-bold text-center mb-6">Mutual Non-Disclosure Agreement</h1>

      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
        <p className="font-semibold mb-1">USING THIS MUTUAL NON-DISCLOSURE AGREEMENT</p>
        <p>
          This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1) this Cover Page ("Cover Page") and (2) the Common Paper
          Mutual NDA Standard Terms Version 1.0 ("Standard Terms") identical to those posted at commonpaper.com/standards/mutual-nda/1.0.
          Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.
        </p>
      </div>

      <table className="w-full border-collapse mb-6 text-sm">
        <tbody>
          <tr className="border border-gray-300">
            <td className="p-3 font-semibold bg-gray-50 w-40 border-r border-gray-300 align-top">Purpose</td>
            <td className="p-3">
              <Highlight>{val(data.purpose, '[Purpose not specified]')}</Highlight>
            </td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-semibold bg-gray-50 border-r border-gray-300 align-top">Effective Date</td>
            <td className="p-3">
              <Highlight>{effectiveDateFormatted}</Highlight>
            </td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-semibold bg-gray-50 border-r border-gray-300 align-top">MNDA Term</td>
            <td className="p-3">
              {data.mndaTermType === 'expires' ? (
                <p>
                  Expires <Highlight>{data.mndaTermYears} year{data.mndaTermYears !== 1 ? 's' : ''}</Highlight> from Effective Date.
                </p>
              ) : (
                <p>Continues until terminated in accordance with the terms of the MNDA.</p>
              )}
            </td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-semibold bg-gray-50 border-r border-gray-300 align-top">Term of Confidentiality</td>
            <td className="p-3">
              {data.confidentialityTermType === 'years' ? (
                <p>
                  <Highlight>{data.confidentialityTermYears} year{data.confidentialityTermYears !== 1 ? 's' : ''}</Highlight> from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.
                </p>
              ) : (
                <p>In perpetuity.</p>
              )}
            </td>
          </tr>
          <tr className="border border-gray-300">
            <td className="p-3 font-semibold bg-gray-50 border-r border-gray-300 align-top">Governing Law &amp; Jurisdiction</td>
            <td className="p-3">
              <p>Governing Law: <Highlight>{val(data.governingLaw, '[Fill in state]')}</Highlight></p>
              <p className="mt-1">Jurisdiction: <Highlight>{val(data.jurisdiction, '[Fill in jurisdiction]')}</Highlight></p>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="text-sm italic mb-4">By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.</p>

      <table className="w-full border-collapse mb-8 text-sm">
        <thead>
          <tr className="border border-gray-300">
            <th className="p-3 bg-gray-50 text-left border-r border-gray-300 w-40"></th>
            <th className="p-3 bg-gray-50 text-center border-r border-gray-300">PARTY 1</th>
            <th className="p-3 bg-gray-50 text-center">PARTY 2</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Signature', '', ''],
            ['Print Name', p1.printName, p2.printName],
            ['Title', p1.title, p2.title],
            ['Company', p1.company, p2.company],
            ['Notice Address', p1.noticeAddress, p2.noticeAddress],
            ['Date', '', ''],
          ].map(([label, v1, v2]) => (
            <tr key={label} className="border border-gray-300">
              <td className="p-3 font-semibold bg-gray-50 border-r border-gray-300 align-top">{label}</td>
              <td className="p-3 border-r border-gray-300 min-h-8">
                {v1 ? <Highlight>{v1}</Highlight> : <span className="text-gray-300">--</span>}
              </td>
              <td className="p-3 min-h-8">
                {v2 ? <Highlight>{v2}</Highlight> : <span className="text-gray-300">--</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-6 border-gray-300" />
      <h2 className="text-lg font-bold mb-4">Standard Terms</h2>

      <ol className="list-decimal list-outside ml-6 space-y-4 text-sm">
        <li>
          <strong>Introduction.</strong> This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) ("MNDA") allows each party ("Disclosing Party") to disclose or make available information in connection with the <Highlight>{val(data.purpose, '[Purpose]')}</Highlight> which (1) the Disclosing Party identifies to the receiving party ("Receiving Party") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("Confidential Information"). Each party's Confidential Information also includes the existence and status of the parties' discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating these Standard Terms ("Cover Page"). Each party is identified on the Cover Page and capitalized terms have the meanings given herein or on the Cover Page.
        </li>
        <li>
          <strong>Use and Protection of Confidential Information.</strong> The Receiving Party shall: (a) use Confidential Information solely for the <Highlight>{val(data.purpose, '[Purpose]')}</Highlight>; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the <Highlight>{val(data.purpose, '[Purpose]')}</Highlight>, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.
        </li>
        <li>
          <strong>Exceptions.</strong> The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.
        </li>
        <li>
          <strong>Disclosures Required by Law.</strong> The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.
        </li>
        <li>
          <strong>Term and Termination.</strong> This MNDA commences on the <Highlight>{effectiveDateFormatted}</Highlight> and expires at the end of the <Highlight>{mndaTermLabel(data)}</Highlight>. Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party's obligations relating to Confidential Information will survive for the <Highlight>{confidentialityTermLabel(data)}</Highlight>, despite any expiration or termination of this MNDA.
        </li>
        <li>
          <strong>Return or Destruction of Confidential Information.</strong> Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.
        </li>
        <li>
          <strong>Proprietary Rights.</strong> The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.
        </li>
        <li>
          <strong>Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        </li>
        <li>
          <strong>Governing Law and Jurisdiction.</strong> This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of <Highlight>{val(data.governingLaw, '[Governing Law]')}</Highlight>, without regard to the conflict of laws provisions of such <Highlight>{val(data.governingLaw, '[Governing Law]')}</Highlight>. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in <Highlight>{val(data.jurisdiction, '[Jurisdiction]')}</Highlight>. Each party irrevocably submits to the exclusive jurisdiction of such <Highlight>{val(data.jurisdiction, '[Jurisdiction]')}</Highlight> in any such suit, action, or proceeding.
        </li>
        <li>
          <strong>Equitable Relief.</strong> A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.
        </li>
        <li>
          <strong>General.</strong> Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. Waivers must be signed by the waiving party's authorized representative and cannot be implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of which is deemed an original and which together form the same agreement.
        </li>
      </ol>

      <p className="mt-6 text-xs text-gray-500">
        Common Paper Mutual Non-Disclosure Agreement Version 1.0 free to use under CC BY 4.0.
      </p>
    </div>
  )
}

export default function NdaCreator() {
  const [data, setData] = useState<NdaFormData>(defaultValues)
  const previewRef = useRef<HTMLDivElement>(null)

  function setParty(party: 'party1' | 'party2', field: keyof Party, value: string) {
    setData((prev) => ({ ...prev, [party]: { ...prev[party], [field]: value } }))
  }

  function set<K extends keyof NdaFormData>(field: K, value: NdaFormData[K]) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function downloadMarkdown() {
    const md = generateMarkdown(data)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mutual-nda.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  function printDocument() {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="no-print bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Mutual NDA Creator</h1>
          <p className="text-sm text-gray-500">Fill in the details to generate your Mutual Non-Disclosure Agreement</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download .md
          </button>
          <button
            onClick={printDocument}
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save as PDF
          </button>
        </div>
      </header>

      <div className="flex gap-0 h-[calc(100vh-73px)]">
        {/* Form Panel */}
        <div className="no-print w-96 shrink-0 overflow-y-auto bg-white border-r border-gray-200 p-6">
          <SectionHeading>Agreement Details</SectionHeading>

          <div className="flex flex-col gap-4">
            <Field label="Purpose">
              <Textarea
                value={data.purpose}
                onChange={(v) => set('purpose', v)}
                placeholder="How Confidential Information may be used"
                rows={3}
              />
            </Field>

            <Field label="Effective Date">
              <Input type="date" value={data.effectiveDate} onChange={(v) => set('effectiveDate', v)} />
            </Field>

            <Field label="MNDA Term">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mndaTermType"
                    checked={data.mndaTermType === 'expires'}
                    onChange={() => set('mndaTermType', 'expires')}
                    className="accent-blue-600"
                  />
                  Expires after
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={data.mndaTermYears}
                    onChange={(e) => set('mndaTermYears', Number(e.target.value))}
                    className="w-14 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={data.mndaTermType !== 'expires'}
                  />
                  year(s)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="mndaTermType"
                    checked={data.mndaTermType === 'continues'}
                    onChange={() => set('mndaTermType', 'continues')}
                    className="accent-blue-600"
                  />
                  Continues until terminated
                </label>
              </div>
            </Field>

            <Field label="Term of Confidentiality">
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="confTermType"
                    checked={data.confidentialityTermType === 'years'}
                    onChange={() => set('confidentialityTermType', 'years')}
                    className="accent-blue-600"
                  />
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={data.confidentialityTermYears}
                    onChange={(e) => set('confidentialityTermYears', Number(e.target.value))}
                    className="w-14 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={data.confidentialityTermType !== 'years'}
                  />
                  year(s) from Effective Date
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="confTermType"
                    checked={data.confidentialityTermType === 'perpetuity'}
                    onChange={() => set('confidentialityTermType', 'perpetuity')}
                    className="accent-blue-600"
                  />
                  In perpetuity
                </label>
              </div>
            </Field>

            <Field label="Governing Law (State)">
              <Input
                value={data.governingLaw}
                onChange={(v) => set('governingLaw', v)}
                placeholder="e.g. Delaware"
              />
            </Field>

            <Field label="Jurisdiction">
              <Input
                value={data.jurisdiction}
                onChange={(v) => set('jurisdiction', v)}
                placeholder="e.g. courts located in New Castle, DE"
              />
            </Field>
          </div>

          <SectionHeading>Party 1</SectionHeading>
          <div className="flex flex-col gap-4">
            <Field label="Company">
              <Input value={data.party1.company} onChange={(v) => setParty('party1', 'company', v)} placeholder="Company name" />
            </Field>
            <Field label="Print Name">
              <Input value={data.party1.printName} onChange={(v) => setParty('party1', 'printName', v)} placeholder="Full name" />
            </Field>
            <Field label="Title">
              <Input value={data.party1.title} onChange={(v) => setParty('party1', 'title', v)} placeholder="Job title" />
            </Field>
            <Field label="Notice Address">
              <Textarea value={data.party1.noticeAddress} onChange={(v) => setParty('party1', 'noticeAddress', v)} placeholder="Email or postal address" rows={2} />
            </Field>
          </div>

          <SectionHeading>Party 2</SectionHeading>
          <div className="flex flex-col gap-4">
            <Field label="Company">
              <Input value={data.party2.company} onChange={(v) => setParty('party2', 'company', v)} placeholder="Company name" />
            </Field>
            <Field label="Print Name">
              <Input value={data.party2.printName} onChange={(v) => setParty('party2', 'printName', v)} placeholder="Full name" />
            </Field>
            <Field label="Title">
              <Input value={data.party2.title} onChange={(v) => setParty('party2', 'title', v)} placeholder="Job title" />
            </Field>
            <Field label="Notice Address">
              <Textarea value={data.party2.noticeAddress} onChange={(v) => setParty('party2', 'noticeAddress', v)} placeholder="Email or postal address" rows={2} />
            </Field>
          </div>

          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
            <strong>Note:</strong> This tool is for informational purposes only and does not constitute legal advice. Please consult your legal team before executing any agreement.
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div ref={previewRef} className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-10 print-page">
            <NdaPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
