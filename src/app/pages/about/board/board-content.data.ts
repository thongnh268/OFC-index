import { type InnerContentBlock } from '../../../shared/components/inner-content/inner-content.component';
import { type OrgDepartment } from './sections/org-chart.component';
import { type PersonEntry } from './sections/board-people.component';
import { type WorkflowStep } from './sections/workflow.component';

// Code-owned bilingual content for the Board of Directors page. Org chart, leadership team,
// advisory board and workflow are real company content from the Figma design (which shipped
// them as a flat image); the CEO "thank you letter" is real copy. Vietnamese is a working
// translation for review. Person photos are PLACEHOLDER portraits (randomuser.me) so the cards
// aren't empty — replace `photoUrl` with the real headshots when available.
export interface BoardSignature {
  readonly role: string;
  readonly signed: string;
  readonly name: string;
}

export interface BoardContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbAbout: string;
  readonly title: string;
  readonly ceoLabel: string;
  readonly departments: readonly OrgDepartment[];
  readonly leadershipHeading: string;
  readonly leadership: readonly PersonEntry[];
  readonly advisoryHeading: string;
  readonly advisory: readonly PersonEntry[];
  readonly workflowHeading: string;
  readonly workflow: readonly WorkflowStep[];
  readonly letterHeading: string;
  readonly blocks: readonly InnerContentBlock[];
  readonly signature: BoardSignature;
}

const LETTER_EN: readonly string[] = [
  'Dear valued customers,',
  'On behalf of all the headquarters and subsidiaries of Thanh Hoa Co., Ltd. and Dai Duong Forest Products JSC., I would like to express our respectful greetings and deepest gratitude for your cooperation.',
  "We are a company that specializes in wood chip and wood pellet processing, manufacturing and afforestation; our corporation's quality management has been strictly controlled and continuously improved throughout its over 10-year history, affirming its position in the market.",
  'Thanks to your valuable trust and cooperation, we have gained significant achievements. You have been not only valued customers, but our companions and motivators, encouraging everyone and every subsidiary in our system to strive to create the best quality products for the market.',
  'In addition to building a factory, we also build a nursery system to ensure the best quality of seedlings provided to forest growers.',
  'We affirm that we will strive to maintain and improve product quality, ensure our reputation with our customers, and be responsible for the community and society.',
  'We are ready to cooperate in all aspects that you are interested in, such as conveyor belts, warehousing, and providing a stable, high-quality and long-lasting goods output.',
  'Once again, on behalf of all the member companies in the system of Thanh Hoa Co., Ltd. and Dai Duong Forest Products JSC., I would like to express my sincere thanks and appreciation to you.',
  'We wish you and your families good health, happiness and success.',
  'Best regards,',
];

const LETTER_VI: readonly string[] = [
  'Kính gửi Quý khách hàng,',
  'Thay mặt toàn thể trụ sở và các công ty thành viên của Công ty TNHH Thanh Hòa và Công ty CP Lâm sản Đại Dương, tôi xin gửi lời chào trân trọng và lòng biết ơn sâu sắc nhất đến sự hợp tác của Quý khách.',
  'Chúng tôi là doanh nghiệp chuyên chế biến, sản xuất dăm gỗ và viên nén gỗ cùng hoạt động trồng rừng; công tác quản lý chất lượng của tập đoàn luôn được kiểm soát chặt chẽ và không ngừng cải tiến trong suốt hơn 10 năm hình thành và phát triển, khẳng định vị thế trên thị trường.',
  'Nhờ sự tin tưởng và hợp tác quý báu của Quý khách, chúng tôi đã đạt được những thành tựu đáng kể. Quý khách không chỉ là khách hàng mà còn là người đồng hành và nguồn động lực, thôi thúc mỗi cá nhân và mỗi công ty thành viên trong hệ thống nỗ lực tạo ra những sản phẩm chất lượng tốt nhất cho thị trường.',
  'Bên cạnh việc xây dựng nhà máy, chúng tôi còn xây dựng hệ thống vườn ươm nhằm bảo đảm chất lượng tốt nhất cho cây giống cung cấp cho người trồng rừng.',
  'Chúng tôi cam kết sẽ nỗ lực duy trì và nâng cao chất lượng sản phẩm, giữ vững uy tín với khách hàng, đồng thời có trách nhiệm với cộng đồng và xã hội.',
  'Chúng tôi sẵn sàng hợp tác trên mọi phương diện mà Quý khách quan tâm, như băng tải, kho bãi và cung cấp nguồn hàng ổn định, chất lượng và lâu dài.',
  'Một lần nữa, thay mặt toàn thể các công ty thành viên trong hệ thống Công ty TNHH Thanh Hòa và Công ty CP Lâm sản Đại Dương, tôi xin gửi lời cảm ơn và tri ân chân thành đến Quý khách.',
  'Kính chúc Quý khách cùng gia đình sức khỏe, hạnh phúc và thành công.',
  'Trân trọng,',
];

const EN: BoardContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbAbout: 'About us',
  title: 'Board of Directors',
  ceoLabel: 'Chief Executive Officer (CEO)',
  departments: [
    {
      icon: 'chartBar',
      title: 'Director of Sales',
      items: [
        { icon: 'sun', label: 'Sales' },
        { icon: 'trendingUp', label: 'Marketing' },
        { icon: 'headset', label: 'Customer Service' },
      ],
    },
    {
      icon: 'factory',
      title: 'Director of Production',
      items: [
        { icon: 'bulb', label: 'R&D' },
        { icon: 'cart', label: 'Procurement' },
        { icon: 'settings', label: 'Manufacturing' },
      ],
    },
    {
      icon: 'currencyDollar',
      title: 'Chief Financial Officer (CFO)',
      items: [
        { icon: 'fileDollar', label: 'Finance' },
        { icon: 'people', label: 'Human Resources' },
      ],
    },
  ],
  leadershipHeading: 'Leadership Team',
  leadership: [
    {
      name: 'Thang Khanh Huy',
      title: 'Chief Executive Officer (CEO)',
      photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Cao Trung Hung',
      title: 'Chief Commercial Officer (CCO) – Board Member',
      photoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Do Thi Diu',
      title: 'Chief Financial Officer (CFO)',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ],
  advisoryHeading: 'Advisory Board',
  advisory: [
    {
      name: 'Park Jeong Eun',
      photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: [
        'Professor at Ewha Womans University',
        'Senior Advisor in Marketing (Korea)',
        'Strategic Advisor at Binh Minh HP (Korea)',
      ],
    },
    {
      name: 'Pham Quoc Khanh',
      photoUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: [
        'PhD in Economics',
        'Senior Lecturer at National Defense Academy',
        'Former Deputy Director of Planning Department',
        'Former Vice Chairman of Nam Dinh Province',
        'Current Senior Advisor at Binh Minh HP',
      ],
    },
    {
      name: 'Nguyen Ngoc Mai',
      photoUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
      bio: ['Chairman of Vietkao Group / Board Member', 'Senior Advisor at Binh Minh HP'],
    },
  ],
  workflowHeading: 'Workflow Process',
  workflow: [
    { icon: 'mail', number: '01', label: 'Receive Customer Inquiry' },
    { icon: 'fileDollar', number: '02', label: 'Provide Quotation' },
    { icon: 'clipboard', number: '03', label: 'Submit Draft Contract' },
    { icon: 'handshake', number: '04', label: 'Sign Contract' },
  ],
  letterHeading: 'Thank you letter',
  blocks: [{ heading: LETTER_EN[0], paragraphs: LETTER_EN.slice(1) }],
  signature: { role: 'C.E.O', signed: '(Signed)', name: 'Phan Van Hien' },
};

const VI: BoardContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbAbout: 'Giới thiệu',
  title: 'Ban Giám đốc',
  ceoLabel: 'Tổng Giám đốc (CEO)',
  departments: [
    {
      icon: 'chartBar',
      title: 'Giám đốc Kinh doanh',
      items: [
        { icon: 'sun', label: 'Bán hàng' },
        { icon: 'trendingUp', label: 'Marketing' },
        { icon: 'headset', label: 'Chăm sóc khách hàng' },
      ],
    },
    {
      icon: 'factory',
      title: 'Giám đốc Sản xuất',
      items: [
        { icon: 'bulb', label: 'Nghiên cứu & Phát triển' },
        { icon: 'cart', label: 'Thu mua' },
        { icon: 'settings', label: 'Sản xuất' },
      ],
    },
    {
      icon: 'currencyDollar',
      title: 'Giám đốc Tài chính (CFO)',
      items: [
        { icon: 'fileDollar', label: 'Tài chính' },
        { icon: 'people', label: 'Nhân sự' },
      ],
    },
  ],
  leadershipHeading: 'Ban lãnh đạo',
  leadership: [
    {
      name: 'Thắng Khánh Huy',
      title: 'Tổng Giám đốc (CEO)',
      photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Cao Trung Hưng',
      title: 'Giám đốc Thương mại (CCO) – Thành viên HĐQT',
      photoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Đỗ Thị Dịu',
      title: 'Giám đốc Tài chính (CFO)',
      photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ],
  advisoryHeading: 'Hội đồng cố vấn',
  advisory: [
    {
      name: 'Park Jeong Eun',
      photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: [
        'Giáo sư Đại học Ewha Womans',
        'Cố vấn cấp cao về Marketing (Hàn Quốc)',
        'Cố vấn chiến lược tại Bình Minh HP (Hàn Quốc)',
      ],
    },
    {
      name: 'Phạm Quốc Khánh',
      photoUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: [
        'Tiến sĩ Kinh tế',
        'Giảng viên cao cấp Học viện Quốc phòng',
        'Nguyên Phó Giám đốc Phòng Kế hoạch',
        'Nguyên Phó Chủ tịch tỉnh Nam Định',
        'Cố vấn cấp cao hiện tại tại Bình Minh HP',
      ],
    },
    {
      name: 'Nguyễn Ngọc Mai',
      photoUrl: 'https://randomuser.me/api/portraits/women/26.jpg',
      bio: ['Chủ tịch Tập đoàn Vietkao / Thành viên HĐQT', 'Cố vấn cấp cao tại Bình Minh HP'],
    },
  ],
  workflowHeading: 'Quy trình làm việc',
  workflow: [
    { icon: 'mail', number: '01', label: 'Tiếp nhận yêu cầu' },
    { icon: 'fileDollar', number: '02', label: 'Báo giá' },
    { icon: 'clipboard', number: '03', label: 'Gửi hợp đồng nháp' },
    { icon: 'handshake', number: '04', label: 'Ký hợp đồng' },
  ],
  letterHeading: 'Thư cảm ơn',
  blocks: [{ heading: LETTER_VI[0], paragraphs: LETTER_VI.slice(1) }],
  signature: { role: 'Tổng Giám đốc', signed: '(Đã ký)', name: 'Phan Văn Hiền' },
};

export function boardContent(locale: string): BoardContent {
  return locale.startsWith('vi') ? VI : EN;
}
