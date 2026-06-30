import { type InnerContentBlock } from '../../../shared/components/inner-content/inner-content.component';

// Code-owned bilingual content for the Establishment Milestones page.
// Figma shows no banner here, so `bannerImage` stays null. The shell, sidebar and CTA around it
// are shared by the inner-page layout.

export interface MilestonesContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbAbout: string;
  readonly title: string;
  /** Banner image URL; null → no banner is shown. */
  readonly bannerImage: string | null;
  readonly body: readonly InnerContentBlock[];
}

const EN: MilestonesContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbAbout: 'About us',
  title: 'Establishment Milestones',
  bannerImage: null,
  body: [
    {
      id: 'establishment',
      heading: 'Establishment',
      paragraphs: [
        "Established in 2017, Dai Duong Forestry Products Processing Joint Stock Company was born with the aspiration of building a modern, professional, and sustainable forestry enterprise, contributing to elevating the value of Vietnam's wood industry in the international market.",
        'From its very first steps, Dai Duong defined its development strategy based on product quality, legal material sources, and reliability in every commitment to customers. Driven by a spirit of continuous innovation, the company has gradually invested in production systems, processing technology, and logistics infrastructure to enhance competitiveness and meet the increasingly high standards of export markets.',
        "Today, Dai Duong has become a trusted partner for numerous international customers in the fields of wood chips, biomass wood pellets, and processed wood products, helping Vietnam's green resources reach further across the global market.",
      ],
    },
    {
      id: 'growth-milestones',
      heading: 'Growth Milestones',
      paragraphs: [
        'The developmental journey of Dai Duong is marked by strong growth in production capacity and export volume. From its initial scale, the company has continuously expanded its factory network, developed its material supply chain, and improved operational capabilities, gradually achieving an export volume of over one million BDMT (Bone Dry Metric Tons) per year.',
        "Dai Duong's products are currently exported steadily to key markets such as Japan, China, and other Asian countries, where requirements for quality, stability, and environmental responsibility are always placed at the forefront.",
        "Each shipment delivered carries not only commercial value but also Dai Duong's commitment to credibility, quality, and responsibility toward customers and the community.",
      ],
    },
    {
      id: 'sustainable-development',
      heading: 'Sustainable Development – The Foundation for the Future',
      paragraphs: [
        'Dai Duong believes that sustainable development is the deciding factor for the long-term success of the enterprise. The company continuously invests in building a transparent supply chain, developing stable material zones, promoting sustainable forest management activities, and applying international standards throughout the entire production process.',
        'Certifications such as FSC and PEFC, along with commitments to emission reduction, efficient resource utilization, and environmental protection, have become crucial foundations helping Dai Duong meet international market requirements and align with the global green economy trend.',
      ],
    },
    {
      id: 'heading-towards-the-future',
      heading: 'Heading Towards the Future',
      paragraphs: [
        'Entering a new phase of development, Dai Duong continues to invest in expanding production capacity, improving product quality, and perfecting a sustainable forestry ecosystem.',
        'With a long-term vision, an innovative spirit, and the companionship of customers, partners, and employees, Dai Duong aims to become a leading enterprise in the forestry processing and export sector, contributing to a greener future for generations to come.',
      ],
    },
  ],
};

const VI: MilestonesContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbAbout: 'Giới thiệu',
  title: 'Cột mốc thành lập',
  bannerImage: null,
  body: [
    {
      id: 'establishment',
      heading: 'Thành lập',
      paragraphs: [
        'Được thành lập vào năm 2017, Công ty Cổ phần Chế biến Lâm sản Đại Dương ra đời với khát vọng xây dựng một doanh nghiệp lâm nghiệp hiện đại, chuyên nghiệp và bền vững, góp phần nâng cao giá trị của ngành gỗ Việt Nam trên thị trường quốc tế.',
        'Ngay từ những bước đi đầu tiên, Đại Dương đã xác định chiến lược phát triển dựa trên chất lượng sản phẩm, nguồn nguyên liệu hợp pháp và sự tin cậy trong mọi cam kết với khách hàng. Với tinh thần không ngừng đổi mới, công ty đã từng bước đầu tư vào hệ thống sản xuất, công nghệ chế biến và hạ tầng logistics nhằm nâng cao năng lực cạnh tranh, đáp ứng các tiêu chuẩn ngày càng khắt khe của thị trường xuất khẩu.',
        'Đến nay, Đại Dương đã trở thành đối tác tin cậy của nhiều khách hàng quốc tế trong các lĩnh vực dăm gỗ, viên nén gỗ sinh học và các sản phẩm gỗ chế biến, góp phần đưa nguồn tài nguyên xanh của Việt Nam vươn xa hơn trên thị trường toàn cầu.',
      ],
    },
    {
      id: 'growth-milestones',
      heading: 'Cột mốc phát triển',
      paragraphs: [
        'Hành trình phát triển của Đại Dương ghi dấu sự tăng trưởng mạnh mẽ về năng lực sản xuất và sản lượng xuất khẩu. Từ quy mô ban đầu, công ty đã liên tục mở rộng mạng lưới nhà máy, phát triển chuỗi cung ứng nguyên liệu và hoàn thiện năng lực vận hành, từng bước đạt sản lượng xuất khẩu hơn một triệu tấn dăm khô (BDMT) mỗi năm.',
        'Các sản phẩm của Đại Dương hiện đang được xuất khẩu ổn định sang các thị trường trọng điểm như Nhật Bản, Trung Quốc và các quốc gia châu Á khác, nơi các yêu cầu về chất lượng, tính ổn định và trách nhiệm môi trường luôn được đặt lên hàng đầu.',
        'Mỗi chuyến hàng được trao đi không chỉ mang giá trị thương mại, mà còn gửi gắm cam kết của Đại Dương về uy tín, chất lượng và trách nhiệm đối với khách hàng cũng như cộng đồng.',
      ],
    },
    {
      id: 'sustainable-development',
      heading: 'Phát triển bền vững – Nền tảng cho tương lai',
      paragraphs: [
        'Đại Dương tin rằng phát triển bền vững là yếu tố quyết định cho sự thành công lâu dài của doanh nghiệp. Công ty không ngừng đầu tư xây dựng chuỗi cung ứng minh bạch, phát triển vùng nguyên liệu ổn định, thúc đẩy hoạt động quản lý rừng bền vững và áp dụng các tiêu chuẩn quốc tế trong suốt quy trình sản xuất.',
        'Các chứng nhận như FSC và PEFC, cùng cam kết giảm thiểu phát thải, sử dụng hiệu quả tài nguyên và bảo vệ môi trường đã trở thành những nền tảng quan trọng giúp Đại Dương đáp ứng yêu cầu của thị trường quốc tế và đồng hành cùng xu thế kinh tế xanh toàn cầu.',
      ],
    },
    {
      id: 'heading-towards-the-future',
      heading: 'Hướng tới tương lai',
      paragraphs: [
        'Bước vào giai đoạn phát triển mới, Đại Dương tiếp tục đầu tư mở rộng quy mô sản xuất, nâng cao chất lượng sản phẩm và hoàn thiện hệ sinh thái lâm nghiệp bền vững.',
        'Với tầm nhìn dài hạn, tinh thần đổi mới sáng tạo cùng sự đồng hành của khách hàng, đối tác và tập thể cán bộ nhân viên, Đại Dương hướng tới mục tiêu trở thành doanh nghiệp hàng đầu trong lĩnh vực chế biến và xuất khẩu lâm sản, đóng góp vào một tương lai xanh hơn cho các thế hệ mai sau.',
      ],
    },
  ],
};

export function milestonesContent(locale: string): MilestonesContent {
  return locale.startsWith('vi') ? VI : EN;
}
