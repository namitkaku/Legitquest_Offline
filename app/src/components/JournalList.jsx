import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border:'none'
  } 
};
Modal.setAppElement("#target");
export default function JournalList({ modalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >
      <div className="pt-8 pb-5">
        <div className="card border-0 shadow py-3">
          <div className="card-body">
            <h3 className="mb-3 font-weight-bold">List of Journals</h3>
            <hr />
            <div
              className="table-responsive mb-0"
              data-pattern="priority-columns"
              style={{ maxHeight: 500, overflow: 'scroll'

              }}
              >
              <table className="table">
                <thead className="bg-dark text-white">
                  <tr className="tableizer-firstrow">
                    <th width={70}>Sr No</th>
                    <th>Journals</th>
                    <th>Journals Name</th>
                    <th>Citation Format</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>ACJ</td>
                    <td>Accidents Claims Journal</td>
                    <td>2011 ACJ 1256</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>ACR</td>
                    <td>Allahabad Criminal Rulings</td>
                    <td>1999 (1) ACR 505</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>AD</td>
                    <td>Apex Decision</td>
                    <td>1995 1 AD (Delhi) 361</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>ADJ</td>
                    <td>Allahabad Daily Judgments</td>
                    <td>2011 (3) ADJ 716</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>AIR (Allahabad)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2009 ALL 12</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>AIR (Andhra Pradesh)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2009 AP 100</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>AIR (Bombay)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2006 BOM 241</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>AIR (Calcutta)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2015 CAL 89</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>AIR (Chhattisgarh)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2018 CHH 118</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>AIR (Gauhati)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2004 GAU 26</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>AIR (Gujarat)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2019 GUJ 7</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>AIR (Himachal Pradesh)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2016 HP 96</td>
                  </tr>
                  <tr>
                    <td>13</td>
                    <td>AIR (Jammu &amp; Kashmir)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2015 J&amp;K 52</td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>AIR (Jharkhand)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2019 JHAR 74</td>
                  </tr>
                  <tr>
                    <td>15</td>
                    <td>AIR (Karnataka)</td>
                    <td>All India Reporter</td>
                    <td>AIR 1999 Kant 335</td>
                  </tr>
                  <tr>
                    <td>16</td>
                    <td>AIR (Kerala)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2015 KER 36</td>
                  </tr>
                  <tr>
                    <td>17</td>
                    <td>AIR (Madhya Pradesh)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2019 MP 38</td>
                  </tr>
                  <tr>
                    <td>18</td>
                    <td>AIR (Madras)</td>
                    <td>All India Reporter</td>
                    <td>AIR 1959 MAD 484</td>
                  </tr>
                  <tr>
                    <td>19</td>
                    <td>AIR (Meghalaya)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2015 Meghalaya 23</td>
                  </tr>
                  <tr>
                    <td>20</td>
                    <td>AIR (Orissa)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2019 ORI 69</td>
                  </tr>
                  <tr>
                    <td>21</td>
                    <td>AIR (Patna)</td>
                    <td>All India Reporter</td>
                    <td>AIR 1962 PAT 67</td>
                  </tr>
                  <tr>
                    <td>22</td>
                    <td>AIR (Punjab and Haryana)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2018 P&amp;H 10</td>
                  </tr>
                  <tr>
                    <td>23</td>
                    <td>AIR (Rajasthan)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2018 RAJ 162</td>
                  </tr>
                  <tr>
                    <td>24</td>
                    <td>AIR (SCW)</td>
                    <td>All India Reporter Supreme Court Weekly</td>
                    <td>AIR 2000 SCW 833</td>
                  </tr>
                  <tr>
                    <td>25</td>
                    <td>AIR (Sikkim)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2018 SIKKIM 10</td>
                  </tr>
                  <tr>
                    <td>26</td>
                    <td>AIR (Tripura)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2018 TRIPURA 15</td>
                  </tr>
                  <tr>
                    <td>27</td>
                    <td>AIR (Uttarakhand)</td>
                    <td>All India Reporter</td>
                    <td>AIR 2019 UTTRA 135</td>
                  </tr>
                  <tr>
                    <td>28</td>
                    <td>AIR Delhi</td>
                    <td>All india Reporter</td>
                    <td>AIR 2019 DEL 69</td>
                  </tr>
                  <tr>
                    <td>29</td>
                    <td>AIR(SC)</td>
                    <td>All India Reporter</td>
                    <td>AIR 1990 SC 1742</td>
                  </tr>
                  <tr>
                    <td>30</td>
                    <td>ALD</td>
                    <td>Andhra Legal Decisions</td>
                    <td>2016 (1) ALD 274</td>
                  </tr>
                  <tr>
                    <td>31</td>
                    <td>ALD</td>
                    <td>Andhra Legal Decisions</td>
                    <td>2014 (1) ALD 689</td>
                  </tr>
                  <tr>
                    <td>32</td>
                    <td>ALJ</td>
                    <td>Allahabad Law Journal</td>
                    <td>2017 (6) ALJ 380</td>
                  </tr>
                  <tr>
                    <td>33</td>
                    <td>Allahabad Criminal Cases</td>
                    <td>Allahabad Criminal Cases</td>
                    <td>2 (2013) ACC 408</td>
                  </tr>
                  <tr>
                    <td>34</td>
                    <td>ALLMR</td>
                    <td>All Maharashtra Law Reporter</td>
                    <td>2015 (2) ALLMR 89</td>
                  </tr>
                  <tr>
                    <td>35</td>
                    <td>ALT</td>
                    <td>Andhra Law Times</td>
                    <td>2015 (3) ALT 302</td>
                  </tr>
                  <tr>
                    <td>36</td>
                    <td>ALT</td>
                    <td>Andhra Law Times</td>
                    <td>2011 (6) ALT 592</td>
                  </tr>
                  <tr>
                    <td>37</td>
                    <td>An.W.R</td>
                    <td>Andhra Weekly Reporter</td>
                    <td>2002 (1) AN.W.R. 154</td>
                  </tr>
                  <tr>
                    <td>38</td>
                    <td>APLJ</td>
                    <td>Andhra Pradesh Law Journal</td>
                    <td>2009 (1) APLJ (HC) 397</td>
                  </tr>
                  <tr>
                    <td>39</td>
                    <td>ArbLR</td>
                    <td>Arbitration Law Reporter</td>
                    <td>2012 (3) ARBLR 357 (AP)</td>
                  </tr>
                  <tr>
                    <td>40</td>
                    <td>BC</td>
                    <td>Banking Cases</td>
                    <td>3 (2012) BC 341</td>
                  </tr>
                  <tr>
                    <td>41</td>
                    <td>BLJR</td>
                    <td>Bihar Law Journal Report</td>
                    <td>2002 (50) BLJR 2551</td>
                  </tr>
                  <tr>
                    <td>42</td>
                    <td>BomCR</td>
                    <td>Bombay Cases Reporter</td>
                    <td>2012 (5) BOMCR 234</td>
                  </tr>
                  <tr>
                    <td>43</td>
                    <td>BomLR</td>
                    <td>Bombay Law Reporter</td>
                    <td>2012 (114) BOMLR 2716</td>
                  </tr>
                  <tr>
                    <td>44</td>
                    <td>CalLT</td>
                    <td>Calcutta Law Times</td>
                    <td>(2003) 3 CALLT 242 (HC)</td>
                  </tr>
                  <tr>
                    <td>45</td>
                    <td>CG.L.R.W</td>
                    <td>The Chhattisgarh Law Report</td>
                    <td>2015 (1) CG.L.R.W. 284</td>
                  </tr>
                  <tr>
                    <td>46</td>
                    <td>CGBCLJ</td>
                    <td>Chhattisgarh Bar Council Law Journal</td>
                    <td>2012 (1) CGBCLJ 262</td>
                  </tr>
                  <tr>
                    <td>47</td>
                    <td>CGLJ</td>
                    <td>Chhattisgarh Law Journal</td>
                    <td>2018 (1) CGLJ 162</td>
                  </tr>
                  <tr>
                    <td>48</td>
                    <td>CHN</td>
                    <td>Calcutta High Court Notes</td>
                    <td>2012 (1) CHN 650</td>
                  </tr>
                  <tr>
                    <td>49</td>
                    <td>CLJ</td>
                    <td>Calcutta Law Journal</td>
                    <td>2016 (3) CLJ (CAL) 468</td>
                  </tr>
                  <tr>
                    <td>50</td>
                    <td>CLR</td>
                    <td>Cuttack Law Report</td>
                    <td>2006 (2) CLR 132</td>
                  </tr>
                  <tr>
                    <td>51</td>
                    <td>CLT</td>
                    <td>Cuttack Law Times</td>
                    <td>3 (2011) CLT 104</td>
                  </tr>
                  <tr>
                    <td>52</td>
                    <td>CompLJ</td>
                    <td>Company Law Journal</td>
                    <td>(2010) 2 COMPLJ 393 (BOM)</td>
                  </tr>
                  <tr>
                    <td>53</td>
                    <td>CompLR</td>
                    <td>Competition Law Reports</td>
                    <td>2017 COMPLR 965 BOM</td>
                  </tr>
                  <tr>
                    <td>54</td>
                    <td>CPJ</td>
                    <td>Consumer Protection Judgment</td>
                    <td>4 (2017) CPJ 61</td>
                  </tr>
                  <tr>
                    <td>55</td>
                    <td>CriLJ</td>
                    <td>Criminal Law Journal</td>
                    <td>2012 CRILJ 2630</td>
                  </tr>
                  <tr>
                    <td>56</td>
                    <td>CTC</td>
                    <td>Current Tamilnadu Cases</td>
                    <td>2007 (1) CTC 42</td>
                  </tr>
                  <tr>
                    <td>57</td>
                    <td>CWN</td>
                    <td>Calcutta Weekly Notes</td>
                    <td>1910 14 CWN 641</td>
                  </tr>
                  <tr>
                    <td>58</td>
                    <td>DLT</td>
                    <td>Delhi Law Times</td>
                    <td>45 (1991) DLT 68</td>
                  </tr>
                  <tr>
                    <td>59</td>
                    <td>DMC</td>
                    <td>Divorce And Matrimonial Cases</td>
                    <td>1 (2012) DMC 37</td>
                  </tr>
                  <tr>
                    <td>60</td>
                    <td>DRJ</td>
                    <td>Delhi Reported Judgment</td>
                    <td>2019 (178) DRJ 553</td>
                  </tr>
                  <tr>
                    <td>61</td>
                    <td>ELT</td>
                    <td>Excise Law Times</td>
                    <td>2017 (355) ELT 80 (BOM)</td>
                  </tr>
                  <tr>
                    <td>62</td>
                    <td>FLR</td>
                    <td>Factory Law Reporter</td>
                    <td>2014 (143) FLR 517</td>
                  </tr>
                  <tr>
                    <td>63</td>
                    <td>Gauhati Law Reports</td>
                    <td>Gauhati Law Reports</td>
                    <td>(1960) 1 GLR 100</td>
                  </tr>
                  <tr>
                    <td>64</td>
                    <td>GLD</td>
                    <td>Gujarat Law Decision</td>
                    <td>2014 (1) GLD 489</td>
                  </tr>
                  <tr>
                    <td>65</td>
                    <td>GLD</td>
                    <td>Gauhati Law Decisions</td>
                    <td>2013 (1) GLD 192 (GAU)</td>
                  </tr>
                  <tr>
                    <td>66</td>
                    <td>GLH</td>
                    <td>Gujarat Law Herald</td>
                    <td>2019 GLH (3) 728</td>
                  </tr>
                  <tr>
                    <td>67</td>
                    <td>GLT</td>
                    <td>Gauhati Law times</td>
                    <td>2017 (2) GLT 479</td>
                  </tr>
                  <tr>
                    <td>68</td>
                    <td>GLT</td>
                    <td>Gauhati Law Times</td>
                    <td>2016 (4) GLT 661</td>
                  </tr>
                  <tr>
                    <td>69</td>
                    <td>GST</td>
                    <td>Goods And Services Tax Cases</td>
                    <td>(2016) 53 GST 85 (BOM)</td>
                  </tr>
                  <tr>
                    <td>70</td>
                    <td>Gujarat Law Reporter</td>
                    <td>Gujarat Law Reporter</td>
                    <td>(2019) 4 GLR 3192</td>
                  </tr>
                  <tr>
                    <td>71</td>
                    <td>ILR (Karnataka)</td>
                    <td>Indian Law Reports</td>
                    <td>2019 ILR KAR 1839</td>
                  </tr>
                  <tr>
                    <td>72</td>
                    <td>ILR (Madras)</td>
                    <td>Indian Law Reports</td>
                    <td>(1906) ILR 29 MAD 205</td>
                  </tr>
                  <tr>
                    <td>73</td>
                    <td>JCR</td>
                    <td>Jharkhand Cases Reporter</td>
                    <td>2019 (3) JCR 464</td>
                  </tr>
                  <tr>
                    <td>74</td>
                    <td>JKJ</td>
                    <td>JK Judgments</td>
                    <td>2003 (2) JKJ 590</td>
                  </tr>
                  <tr>
                    <td>75</td>
                    <td>JLJR</td>
                    <td>Jharkhand Law Journal Repprts</td>
                    <td>2020 (1) JLJR 421</td>
                  </tr>
                  <tr>
                    <td>76</td>
                    <td>JT</td>
                    <td>Judgment Today</td>
                    <td>JT 2003 (9) SC 398</td>
                  </tr>
                  <tr>
                    <td>77</td>
                    <td>KarLJ</td>
                    <td>Karnataka Law Journal</td>
                    <td>2020 (2) KARLJ 176</td>
                  </tr>
                  <tr>
                    <td>78</td>
                    <td>KCCR</td>
                    <td>Karnataka Civil And Criminal Reporter</td>
                    <td>2020 (1) KCCR 710</td>
                  </tr>
                  <tr>
                    <td>79</td>
                    <td>KHC</td>
                    <td>Kerala High Court</td>
                    <td>2020 (1) KHC 430</td>
                  </tr>
                  <tr>
                    <td>80</td>
                    <td>KLJ</td>
                    <td>Kerala Law Journal</td>
                    <td>2017 (4) KLJ 650</td>
                  </tr>
                  <tr>
                    <td>81</td>
                    <td>KLT</td>
                    <td>Kerala Law Times</td>
                    <td>2020 (1) KLT 466</td>
                  </tr>
                  <tr>
                    <td>82</td>
                    <td>LLJ</td>
                    <td>Labour Law Journal</td>
                    <td>(2017) 2 LLJ 655</td>
                  </tr>
                  <tr>
                    <td>83</td>
                    <td>MhLJ</td>
                    <td>Maharashtra Law Journal</td>
                    <td>2019 (6) MHLJ 937</td>
                  </tr>
                  <tr>
                    <td>84</td>
                    <td>MLJ</td>
                    <td>Madras Law Journal</td>
                    <td>(2016) 7 MLJ 102</td>
                  </tr>
                  <tr>
                    <td>85</td>
                    <td>MLJ(Criminal)</td>
                    <td>Madras Law Journal</td>
                    <td>(2015) 3 MLJ (CRL) 302</td>
                  </tr>
                  <tr>
                    <td>86</td>
                    <td>MPHT</td>
                    <td>MP High court Today</td>
                    <td>2013 (3) MPHT 135</td>
                  </tr>
                  <tr>
                    <td>87</td>
                    <td>MPJR</td>
                    <td>M.P.Judicial Reporter</td>
                    <td>2014 (4) MPJR 68</td>
                  </tr>
                  <tr>
                    <td>88</td>
                    <td>MPLJ</td>
                    <td>M.P.Law Journal</td>
                    <td>2016 (3) MPLJ 145</td>
                  </tr>
                  <tr>
                    <td>89</td>
                    <td>NCC</td>
                    <td>Nainital criminal Cases</td>
                    <td>2010 (1) N.C.C. 427</td>
                  </tr>
                  <tr>
                    <td>90</td>
                    <td>OCR</td>
                    <td>Orissa Criminal Reporter</td>
                    <td>(2009) 44 OCR 758</td>
                  </tr>
                  <tr>
                    <td>91</td>
                    <td>OLR</td>
                    <td>Orissa Law Reviews</td>
                    <td>2020 (1) OLR 379</td>
                  </tr>
                  <tr>
                    <td>92</td>
                    <td>PLJR</td>
                    <td>Patna Law Journal Reports</td>
                    <td>2018 (6) PLJR 914</td>
                  </tr>
                  <tr>
                    <td>93</td>
                    <td>PLR</td>
                    <td>Punjab Law Reporter</td>
                    <td>(2012) 167 PLR 277</td>
                  </tr>
                  <tr>
                    <td>94</td>
                    <td>PTC</td>
                    <td>Patent and Trade marks Cases</td>
                    <td>2019 (77) PTC 589</td>
                  </tr>
                  <tr>
                    <td>95</td>
                    <td>RCR (Civil)</td>
                    <td>Recent Civil Reports</td>
                    <td>2016 (2) RCR (CIVIL) 154</td>
                  </tr>
                  <tr>
                    <td>96</td>
                    <td>RCR (Criminal)</td>
                    <td>Recent Criminal Report</td>
                    <td>2018 (4) RCR (CRIMINAL) 462</td>
                  </tr>
                  <tr>
                    <td>97</td>
                    <td>RCR (Rent)</td>
                    <td>Rent Control Reporter</td>
                    <td>2019 (1) RCR (RENT) 357</td>
                  </tr>
                  <tr>
                    <td>98</td>
                    <td>RLR</td>
                    <td>Rajasthan Law Reporter</td>
                    <td>2012 (3) RLR 2076</td>
                  </tr>
                  <tr>
                    <td>99</td>
                    <td>RLW</td>
                    <td>Rajasthan Law Weekly</td>
                    <td>2012 (3) RLW 2076 (RAJ)</td>
                  </tr>
                  <tr>
                    <td>100</td>
                    <td>Scale</td>
                    <td>Supreme court Almanac</td>
                    <td>1995 (6) SCALE 744</td>
                  </tr>
                  <tr>
                    <td>101</td>
                    <td>SCC</td>
                    <td>Supreme Court Cases</td>
                    <td>(2001) 6 SCC 767</td>
                  </tr>
                  <tr>
                    <td>102</td>
                    <td>SCR</td>
                    <td>Supreme Court Reporter</td>
                    <td>[1950] 1 SCR 459 10</td>
                  </tr>
                  <tr>
                    <td>103</td>
                    <td>ShimLC</td>
                    <td>Shimla Law Cases</td>
                    <td>2020 (1) ShimLC 66</td>
                  </tr>
                  <tr>
                    <td>104</td>
                    <td>Sikkim Law Reports</td>
                    <td>Sikkim Law Reports</td>
                    <td>SLR (2019) SIKKIM 183</td>
                  </tr>
                  <tr>
                    <td>105</td>
                    <td>TAXMAN</td>
                    <td>TAXMAN</td>
                    <td>[2018] 253 TAXMAN 191</td>
                  </tr>
                  <tr>
                    <td>106</td>
                    <td>TLR</td>
                    <td>Tripura Law Reports</td>
                    <td>(2017) 1 TLR 474</td>
                  </tr>
                  <tr>
                    <td>107</td>
                    <td>UC</td>
                    <td>Uttaranchal Cases</td>
                    <td>2015 (2) UC 1287</td>
                  </tr>
                  <tr>
                    <td>108</td>
                    <td>UD</td>
                    <td>Uttaranchal Decisions</td>
                    <td>2003 (1) U.D. 351</td>
                  </tr>
                  <tr>
                    <td>109</td>
                    <td>UPLBEC</td>
                    <td>U.P. Local Bodies &amp; Educational Cases</td>
                    <td>(2011) 2 UPLBEC 265</td>
                  </tr>
                  <tr>
                    <td>110</td>
                    <td>WBLR</td>
                    <td>The West Bengal Law Reporter</td>
                    <td>2019 (1) WBLR 202</td>
                  </tr>
                  <tr>
                    <td>111</td>
                    <td>WLC</td>
                    <td>Western Law Cases</td>
                    <td>1995 (3) WLC 718</td>
                  </tr>
                  <tr>
                    <td>112</td>
                    <td>WLN</td>
                    <td>Weekly Law Notes</td>
                    <td>2010 (4) WLN 32</td>
                  </tr>
                  <tr>
                    <td>113</td>
                    <td>ABR</td>
                    <td>ABR</td>
                    <td>2006 (1) ABR 393</td>
                  </tr>
                  <tr>
                    <td>114</td>
                    <td>FAJ</td>
                    <td>All India Prevention of Food Adulteration Journal</td>
                    <td>2014 FAJ 250 (KAR)</td>
                  </tr>
                  <tr>
                    <td>115</td>
                    <td>CDR</td>
                    <td>All India Reports- Current Diwani Reports</td>
                    <td>2013 (1) CDR 1 (RAJ)</td>
                  </tr>
                  <tr>
                    <td>116</td>
                    <td>AJR</td>
                    <td>All India Reports- Jharkhand High Court Reports</td>
                    <td>2018 (2) AJR 160</td>
                  </tr>
                  <tr>
                    <td>117</td>
                    <td>AKR</td>
                    <td>All India Reports- Karnataka High Court Reports</td>
                    <td>2016 (1) AKR 298</td>
                  </tr>
                  <tr>
                    <td>118</td>
                    <td>ALR</td>
                    <td>Allahabad Law Reports</td>
                    <td>1993 (21) ALR 425 1</td>
                  </tr>
                  <tr>
                    <td>119</td>
                    <td>ARC</td>
                    <td>Allahabad Rent Cases</td>
                    <td>2003 (2) ARC 254</td>
                  </tr>
                  <tr>
                    <td>120</td>
                    <td>AWC</td>
                    <td>Allahabad Weekly Cases</td>
                    <td>1995 3 AWC 1396 ALL</td>
                  </tr>
                  <tr>
                    <td>121</td>
                    <td>AWR</td>
                    <td>Allahabad Weekly Reporter</td>
                    <td>(1962) 1 AWR SC 112</td>
                  </tr>
                  <tr>
                    <td>122</td>
                    <td>APSTJ</td>
                    <td>Andhra Pradesh Sales Tax Journal</td>
                    <td>(1994) 18 APSTJ 1</td>
                  </tr>
                  <tr>
                    <td>123</td>
                    <td>CIVILCC</td>
                    <td>Civil Court Cases</td>
                    <td>2020 (1) CIVILCC 310</td>
                  </tr>
                  <tr>
                    <td>124</td>
                    <td>COMPCAS</td>
                    <td>Company Cases</td>
                    <td>[2017] 205 COMPCAS 194 (ALL)</td>
                  </tr>
                  <tr>
                    <td>125</td>
                    <td>CPC</td>
                    <td>Consumer Protection Cases</td>
                    <td>(1998) 2 CPC 582</td>
                  </tr>
                  <tr>
                    <td>126</td>
                    <td>CTLJ</td>
                    <td>Contracts and Tenders Law Journal</td>
                    <td>2007 (2) CTLJ 126 (HP)</td>
                  </tr>
                  <tr>
                    <td>127</td>
                    <td>CLA</td>
                    <td>Corporate Law Adviser</td>
                    <td>[2016] 133 CLA 1 86 (SC)</td>
                  </tr>
                  <tr>
                    <td>128</td>
                    <td>CRIMES</td>
                    <td>Crimes</td>
                    <td>2014 (4) CRIMES (SN) 118</td>
                  </tr>
                  <tr>
                    <td>129</td>
                    <td>CRIMINALCC</td>
                    <td>Criminal Court Cases</td>
                    <td>2018 (4) CRIMINALCC 735</td>
                  </tr>
                  <tr>
                    <td>130</td>
                    <td>CCR</td>
                    <td>Current Criminal Reports</td>
                    <td>1 (2016) CCR 383</td>
                  </tr>
                  <tr>
                    <td>131</td>
                    <td>CTR</td>
                    <td>Current Tax Reporter</td>
                    <td>(2012) 251 CTR (CHHATTISGARH) 58</td>
                  </tr>
                  <tr>
                    <td>132</td>
                    <td>ESC</td>
                    <td>Education and Service Cases</td>
                    <td>2005 (2) ESC 1355 (DEL)</td>
                  </tr>
                  <tr>
                    <td>133</td>
                    <td>FLT</td>
                    <td>Environmental and Forest Law Times</td>
                    <td>2016 (6) FLT 220</td>
                  </tr>
                  <tr>
                    <td>134</td>
                    <td>ECC</td>
                    <td>Excise &amp; Customs Cases</td>
                    <td>1998 (62) ECC 606 (SC)</td>
                  </tr>
                  <tr>
                    <td>135</td>
                    <td>ECR</td>
                    <td>Excise and Custom Reports</td>
                    <td>2013 (200) ECR 145 (SIKKIM)</td>
                  </tr>
                  <tr>
                    <td>136</td>
                    <td>GSTR</td>
                    <td>Goods And Service Tax Reports</td>
                    <td>[2018] 53 GSTR 149 (GAU)</td>
                  </tr>
                  <tr>
                    <td>137</td>
                    <td>ITR</td>
                    <td>Income Tax Reporter</td>
                    <td>[1974] 95 ITR 586 (HP)</td>
                  </tr>
                  <tr>
                    <td>138</td>
                    <td>ITD</td>
                    <td>Income-tax Tribunal Decisions</td>
                    <td>[1984] 10 ITD 412 (DEL)</td>
                  </tr>
                  <tr>
                    <td>139</td>
                    <td>ITC</td>
                    <td>ITC</td>
                    <td>[2001] 251 ITR 492 (MP)</td>
                  </tr>
                  <tr>
                    <td>140</td>
                    <td>JLJ</td>
                    <td>Jabalpur Law Journal</td>
                    <td>1960 (0) JLJ 870 (SC)</td>
                  </tr>
                  <tr>
                    <td>141</td>
                    <td>JCC</td>
                    <td>Journal Of Criminal Cases</td>
                    <td>2013 (3) JCC 1767</td>
                  </tr>
                  <tr>
                    <td>142</td>
                    <td>LABIC</td>
                    <td>Labour and Industrial cases</td>
                    <td>2016 LABIC 641</td>
                  </tr>
                  <tr>
                    <td>143</td>
                    <td>LLN</td>
                    <td>Labour Law Notes</td>
                    <td>2013 (1) LLN 104 (BOM)</td>
                  </tr>
                  <tr>
                    <td>144</td>
                    <td>LLR</td>
                    <td>Labour Law Reporter</td>
                    <td>2015 LLR 738</td>
                  </tr>
                  <tr>
                    <td>145</td>
                    <td>MWN</td>
                    <td>MADRAS WEEKLY NOTES</td>
                    <td>1911 (2) MWN 93</td>
                  </tr>
                  <tr>
                    <td>146</td>
                    <td>MIPR</td>
                    <td>MIPR</td>
                    <td>MIPR 2014 (3) (SNC) 1</td>
                  </tr>
                  <tr>
                    <td>147</td>
                    <td>MYSLJ</td>
                    <td>Mysore Law Journal</td>
                    <td>(1957) 35 MYSLJ SC 117</td>
                  </tr>
                  <tr>
                    <td>148</td>
                    <td>NLJ</td>
                    <td>Nagpur Law Journal</td>
                    <td>1960 NLJ 1</td>
                  </tr>
                  <tr>
                    <td>149</td>
                    <td>RAJ</td>
                    <td>Recent Arbitration Judgments</td>
                    <td>2006 (1) RAJ (SN) 335</td>
                  </tr>
                  <tr>
                    <td>150</td>
                    <td>RRR</td>
                    <td>Recent Revenue Report</td>
                    <td>1996 1 RRR 259</td>
                  </tr>
                  <tr>
                    <td>151</td>
                    <td>RD</td>
                    <td>Revenue Decisions</td>
                    <td>2014 125 RD 163</td>
                  </tr>
                  <tr>
                    <td>152</td>
                    <td>STC</td>
                    <td>Sales Tax Cases</td>
                    <td>[2004] 134 STC 403 (UTTRA)</td>
                  </tr>
                  <tr>
                    <td>153</td>
                    <td>SCL</td>
                    <td>Sebi and Corporate laws</td>
                    <td>[2005] 63 SCL 499 (Pat)</td>
                  </tr>
                  <tr>
                    <td>154</td>
                    <td>SOT</td>
                    <td>Selected Orders of ITAT</td>
                    <td>(2009) 33 SOT 270 (DEL)</td>
                  </tr>
                  <tr>
                    <td>155</td>
                    <td>SCT</td>
                    <td>Service Cases Today</td>
                    <td>2016 (1) SCT 316 (UTTRA)</td>
                  </tr>
                  <tr>
                    <td>156</td>
                    <td>STJ</td>
                    <td>Service Tax Journal</td>
                    <td>[2010] 20 STJ 83 (GUJ)</td>
                  </tr>
                  <tr>
                    <td>157</td>
                    <td>STR</td>
                    <td>Service Tax Review</td>
                    <td>2017 [48] S.T.R. 289 (JHAR)</td>
                  </tr>
                  <tr>
                    <td>158</td>
                    <td>SCJ</td>
                    <td>SUPREME COURT JOURNAL</td>
                    <td>2018 (3) SCJ 104</td>
                  </tr>
                  <tr>
                    <td>159</td>
                    <td>TTJ</td>
                    <td>Tax Tribunal Judgments</td>
                    <td>(2001) 71 TTJ 182</td>
                  </tr>
                  <tr>
                    <td>160</td>
                    <td>TAXLR</td>
                    <td>Taxation Law Reporter</td>
                    <td>1983 TAXLR 2527</td>
                  </tr>
                  <tr>
                    <td>161</td>
                    <td>STT</td>
                    <td>Taxman's Service Tax Today</td>
                    <td>[2013] 41 STT 95</td>
                  </tr>
                  <tr>
                    <td>162</td>
                    <td>TAC</td>
                    <td>Transport &amp; Accident Cases</td>
                    <td>2013 (3) TAC 327</td>
                  </tr>
                  <tr>
                    <td>163</td>
                    <td>VST</td>
                    <td>VAT AND SERVICE TAX CASES</td>
                    <td>(2013) 62 VST 422 (DEL)</td>
                  </tr>
                  <tr>
                    <td>164</td>
                    <td>VAT</td>
                    <td>Vat Reporter</td>
                    <td>(2009) 11 VAT REPORTER 168</td>
                  </tr>
                  <tr>
                    <td>165</td>
                    <td>WRITLR</td>
                    <td>Writ Law Reporter</td>
                    <td>2017 1 WRITLR 1</td>
                  </tr>
                  <tr>
                    <td>166</td>
                    <td>ALLCC</td>
                    <td>Allahabad Criminal cases</td>
                    <td>2013 (82) ALLCC 153</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
