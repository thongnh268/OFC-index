import { type InnerContentBlock } from '../../../shared/components/inner-content/inner-content.component';
import { type OrgRole } from './sections/org-chart.component';

// Code-owned bilingual content for the Board of Directors page. Org chart, leadership team,
// advisory board and workflow are real company content from the Figma design (which shipped
// them as a flat image); the CEO "Letter of Appreciation" is real copy. Vietnamese is a working
// translation for review. Person photos are PLACEHOLDER portraits (randomuser.me) so the cards
// aren't empty - replace `photoUrl` with the real headshots when available.
export interface BoardSignature {
  readonly role: string;
  readonly signed: string;
}

export interface BoardContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbAbout: string;
  readonly title: string;
  readonly chairmanLabel: string;
  readonly executiveLabel: string;
  readonly directors: readonly OrgRole[];
  readonly managers: readonly OrgRole[];
  readonly letterHeading: string;
  readonly blocks: readonly InnerContentBlock[];
  readonly signature: BoardSignature;
}

const LETTER_EN: readonly string[] = [
  'Dear valued customers and partners,',
  'On behalf of the Board of Management and all employees of Dai Duong Forest Products Processing Joint Stock Company, I would like to extend our respectful greetings, sincere thanks, and deepest gratitude for your trust, companionship, and valuable cooperation over the years.',
  'Throughout our journey of building and developing, Dai Duong has always kept in mind that our success is measured not only by production scale or export volume, but also by the trust of our customers, the strong bonds with our partners, and the sustainable values we bring to the community and society.',
  'As a company operating in the processing and exporting of wood chips, biomass wood pellets, and other wood products, we continuously invest in technology, perfect our quality management systems, and develop legal, sustainable raw material sources to meet the increasingly rigorous standards of the international market. Every product bearing the Dai Duong brand is not merely the outcome of a strict production process, but also a testament to our commitment to quality, credibility, and environmental responsibility.',
  'We understand that our achievements today bear the significant hallmark of your companionship. Your trust and enduring cooperation have become the driving force for Dai Duong to continuously innovate, enhance our competitive capacity, and steadily affirm our position in both domestic and international markets.',
  'With a long-term strategic vision, Dai Duong continues to pursue the goal of building a sustainable forestry value chain, developing stable raw material zones, improving service quality, and creating environmentally friendly products. We aim to contribute to the growth of a green economy and the reduction of global carbon emissions.',
  'We commit to maintaining a spirit of sincere, transparent, and responsible cooperation. We will continuously improve to provide you with the best products and services, truly worthy of the trust you have placed in Dai Duong.',
  'Once again, we extend our heartfelt thanks for your continued partnership. We wish you and your families health, happiness, prosperity, and success. We look forward to continuing to walk alongside you on the path of sustainable development in the future.',
  'Sincerely',
];

const LETTER_VI: readonly string[] = [
  'Kính gửi Quý khách hàng, Quý đối tác!',
  'Thay mặt Ban Lãnh đạo cùng toàn thể cán bộ, công nhân viên Công ty Cổ phần Chế biến Lâm sản Đại Dương, tôi xin gửi tới Quý vị lời chào trân trọng, lời cảm ơn chân thành và sự tri ân sâu sắc nhất vì sự tin tưởng, đồng hành và hợp tác quý báu trong suốt thời gian qua.',
  'Trên hành trình xây dựng và phát triển, Đại Dương luôn tâm niệm rằng thành công của doanh nghiệp không chỉ được đo bằng quy mô sản xuất hay sản lượng xuất khẩu, mà còn được tạo nên từ niềm tin của khách hàng, sự gắn kết của đối tác và những giá trị bền vững mà chúng tôi mang lại cho cộng đồng và xã hội.',
  'Là doanh nghiệp hoạt động trong lĩnh vực chế biến và xuất khẩu dăm gỗ, viên nén gỗ sinh khối và các sản phẩm từ gỗ, chúng tôi không ngừng đầu tư công nghệ, hoàn thiện hệ thống quản lý chất lượng, phát triển nguồn nguyên liệu hợp pháp và bền vững nhằm đáp ứng những tiêu chuẩn ngày càng cao của thị trường quốc tế. Mỗi sản phẩm mang thương hiệu Đại Dương không chỉ là kết quả của quá trình sản xuất nghiêm ngặt mà còn là cam kết về chất lượng, uy tín và trách nhiệm đối với môi trường.',
  'Chúng tôi hiểu rằng, những thành tựu đạt được hôm nay đều có dấu ấn quan trọng từ sự đồng hành của Quý Khách hàng và Quý Đối tác. Chính sự tin tưởng và hợp tác bền chặt của Quý vị đã trở thành động lực để Đại Dương không ngừng đổi mới, nâng cao năng lực cạnh tranh và từng bước khẳng định vị thế của mình trên thị trường trong nước cũng như quốc tế.',
  'Với định hướng phát triển lâu dài, Đại Dương tiếp tục theo đuổi mục tiêu xây dựng chuỗi giá trị lâm sản bền vững, phát triển vùng nguyên liệu ổn định, nâng cao chất lượng dịch vụ và tạo ra những sản phẩm thân thiện với môi trường, góp phần vào sự phát triển của nền kinh tế xanh và giảm phát thải carbon toàn cầu.',
  'Chúng tôi cam kết sẽ luôn giữ vững tinh thần hợp tác chân thành, minh bạch và trách nhiệm; không ngừng cải tiến để mang đến cho Quý Khách hàng những sản phẩm và dịch vụ tốt nhất, xứng đáng với niềm tin mà Quý vị đã dành cho Đại Dương.',
  'Một lần nữa, xin trân trọng cảm ơn sự đồng hành của Quý Khách hàng và Quý Đối tác. Kính chúc Quý vị cùng gia đình sức khỏe, hạnh phúc, thịnh vượng và thành công. Chúng tôi mong muốn tiếp tục được đồng hành cùng Quý vị trên chặng đường phát triển bền vững trong tương lai.',
  'Trân trọng',
];

const EN: BoardContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbAbout: 'About us',
  title: 'Board of Directors',
  chairmanLabel: 'Chairman of the Board',
  executiveLabel: 'Executive Board',
  directors: [
    { icon: 'settings', label: 'System Director' },
    { icon: 'people', label: 'HR Director' },
    { icon: 'chartBar', label: 'Chief Financial Officer' },
    { icon: 'wood', label: 'Director of Laminated Timber Division', highlight: true },
    { icon: 'packages', label: 'Director of Pellet Production Division' },
    { icon: 'ship', label: 'Director of PTSC Dai Duong' },
    { icon: 'cart', label: 'Procurement Manager' },
  ],
  managers: [
    { icon: 'factory', label: 'Manager of Dai Duong Wood Chip Factory' },
    { icon: 'factory', label: 'Manager of PTSC Wood Chip Factory' },
    { icon: 'factory', label: 'Manager of Dai Duong Laminated Timber Factory' },
    { icon: 'factory', label: 'Manager of Conveyor Operation Division' },
  ],
  letterHeading: 'Letter of Appreciation',
  blocks: [{ heading: LETTER_EN[0], paragraphs: LETTER_EN.slice(1) }],
  signature: { role: 'Board of Management\nDai Duong Forest JSC', signed: '(Signed)' },
};

const VI: BoardContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbAbout: 'Giới thiệu',
  title: 'Ban Giám đốc',
  chairmanLabel: 'Chủ tịch Hội đồng Quản trị',
  executiveLabel: 'Ban Điều hành',
  directors: [
    { icon: 'settings', label: 'Giám đốc Hệ thống' },
    { icon: 'people', label: 'Giám đốc Nhân sự' },
    { icon: 'chartBar', label: 'Giám đốc Tài chính' },
    { icon: 'wood', label: 'Giám đốc Phân xưởng Gỗ ghép', highlight: true },
    { icon: 'packages', label: 'Giám đốc Phân xưởng Sản xuất Viên nén' },
    { icon: 'ship', label: 'Giám đốc PTSC Đại Dương' },
    { icon: 'cart', label: 'Quản lý Thu mua' },
  ],
  managers: [
    { icon: 'factory', label: 'Quản lý Nhà máy Dăm gỗ Đại Dương' },
    { icon: 'factory', label: 'Quản lý Nhà máy Dăm gỗ PTSC' },
    { icon: 'factory', label: 'Quản lý Nhà máy Gỗ ghép Đại Dương' },
    { icon: 'factory', label: 'Quản lý Bộ phận Vận hành Băng tải' },
  ],
  letterHeading: 'Thư cảm ơn',
  blocks: [{ heading: LETTER_VI[0], paragraphs: LETTER_VI.slice(1) }],
  signature: { role: 'Ban Điều hành \nCông ty Cổ phần Lâm nghiệp Đại Dương', signed: '(Đã ký)' },
};

export function boardContent(locale: string): BoardContent {
  return locale.startsWith('vi') ? VI : EN;
}
