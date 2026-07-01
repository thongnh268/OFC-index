// Code-owned bilingual content for the Recruitment page (linked from SECONDARY_NAV).
// Copy is real company text (Vietnamese is a working translation for review).

export interface JobPosition {
  readonly code: string;
  readonly title: string;
  readonly responsibilities: readonly string[];
  readonly requirements: readonly string[];
  readonly compensation: string;
  readonly benefits: readonly string[];
}

export interface RecruitmentContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbTitle: string;
  readonly title: string;
  readonly companyLine: string;
  readonly tagline: string;
  readonly intro: string;
  readonly openingPositionsHeading: string;
  readonly noOpenPositionsLabel: string;
  readonly applicationDocumentsHeading: string;
  readonly applicationDocuments: readonly string[];
  readonly contactHeading: string;
  readonly applicationEmailLabel: string;
  readonly applicationEmail: string;
  readonly submitInPersonLabel: string;
  readonly submitInPersonLines: readonly string[];
  readonly responsibilitiesLabel: string;
  readonly requirementsLabel: string;
  readonly compensationLabel: string;
  readonly benefitsLabel: string;
  readonly sidebarSectionsTitle: string;
  readonly sectionOpenPositions: string;
  readonly sectionApplicationDocuments: string;
  readonly sectionContactInformation: string;
  readonly applyNowLabel: string;
  readonly ctaHeading: string;
  readonly ctaButtonLabel: string;
}

const EN: RecruitmentContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbTitle: 'Recruitment',
  title: 'Career Opportunities',
  companyLine: 'At Dai Duong Forest Products Joint Stock Company',
  tagline: 'Join Dai Duong – Grow with Us for a Sustainable Future',
  intro:
    'Dai Duong Forest Products Joint Stock Company is a manufacturer and exporter of wood chips, biomass wood pellets, and wood-based products. With a professional and stable working environment and excellent career development opportunities, we welcome dynamic, responsible, and dedicated individuals who are looking to build a long-term career with our company.',
  openingPositionsHeading: 'Opening Positions',
  noOpenPositionsLabel: 'No open positions at the moment.',
  applicationDocumentsHeading: 'Application Documents',
  applicationDocuments: [
    'Curriculum Vitae (CV)',
    'Copy of Citizen Identification Card',
    'Copy of Birth Certificate',
    'Health Certificate',
    'Relevant diplomas and certificates (if applicable)',
  ],
  contactHeading: 'Contact Information',
  applicationEmailLabel: 'Application Email',
  applicationEmail: 'tuyendung.ofc@gmail.com',
  submitInPersonLabel: 'Submit Applications In Person',
  submitInPersonLines: [
    'Dai Duong Wood Processing Joint Stock Company',
    'Nghi Son Economic Zone, Truong Lam Commune, Thanh Hoa Province, Vietnam',
  ],
  responsibilitiesLabel: 'Job Responsibilities',
  requirementsLabel: 'Requirements',
  compensationLabel: 'Compensation',
  benefitsLabel: 'Benefits',
  sidebarSectionsTitle: 'Career Opportunities',
  sectionOpenPositions: 'Open positions',
  sectionApplicationDocuments: 'Application documents',
  sectionContactInformation: 'Contact information',
  applyNowLabel: 'Apply now',
  ctaHeading: 'Or click the Apply Now button on our website to submit your application online',
  ctaButtonLabel: 'Apply Now',
};

const VI: RecruitmentContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbTitle: 'Tuyển dụng',
  title: 'Cơ hội nghề nghiệp',
  companyLine: 'Tại Công ty Cổ phần Chế biến Lâm sản Đại Dương',
  tagline: 'Tham gia Đại Dương – Cùng chúng tôi phát triển vì một tương lai bền vững',
  intro:
    'Công ty Cổ phần Chế biến Lâm sản Đại Dương là nhà sản xuất và xuất khẩu mùn cưa, viên gỗ sinh khối và các sản phẩm gỗ. Với môi trường làm việc chuyên nghiệp, ổn định và cơ hội phát triển nghề nghiệp tuyệt vời, chúng tôi chào đón những cá nhân năng động, có trách nhiệm và tận tâm đang tìm kiếm cơ hội xây dựng sự nghiệp lâu dài cùng công ty.',
  openingPositionsHeading: 'Các vị trí đang tuyển',
  noOpenPositionsLabel: 'Hiện chưa có vị trí đang tuyển.',
  applicationDocumentsHeading: 'Hồ sơ ứng tuyển',
  applicationDocuments: [
    'Sơ yếu lý lịch (CV)',
    'Bản sao Căn cước công dân',
    'Bản sao Giấy khai sinh',
    'Giấy khám sức khỏe',
    'Bằng cấp và chứng chỉ liên quan (nếu có)',
  ],
  contactHeading: 'Thông tin liên hệ',
  applicationEmailLabel: 'Email ứng tuyển',
  applicationEmail: 'tuyendung.ofc@gmail.com',
  submitInPersonLabel: 'Nộp hồ sơ trực tiếp',
  submitInPersonLines: [
    'Công ty Cổ phần Chế biến Gỗ Đại Dương',
    'Khu kinh tế Nghi Sơn, xã Trường Lâm, tỉnh Thanh Hóa, Việt Nam',
  ],
  responsibilitiesLabel: 'Mô tả công việc',
  requirementsLabel: 'Yêu cầu',
  compensationLabel: 'Mức lương',
  benefitsLabel: 'Quyền lợi',
  sidebarSectionsTitle: 'Cơ hội nghề nghiệp',
  sectionOpenPositions: 'Vị trí đang tuyển',
  sectionApplicationDocuments: 'Hồ sơ ứng tuyển',
  sectionContactInformation: 'Thông tin liên hệ',
  applyNowLabel: 'Ứng tuyển ngay',
  ctaHeading: 'Hoặc nhấp vào nút Ứng tuyển ngay trên trang web của chúng tôi để nộp đơn trực tuyến',
  ctaButtonLabel: 'Ứng tuyển ngay',
};

export function recruitmentContent(locale: string): RecruitmentContent {
  return locale.startsWith('vi') ? VI : EN;
}
