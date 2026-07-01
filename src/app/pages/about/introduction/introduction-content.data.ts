import { type InnerContentBlock } from '../../../shared/components/inner-content/inner-content.component';

// Code-owned bilingual content for the Company Introduction page. Copy is real company text
// (Vietnamese is a working translation for review). Block ids mirror the sidebar section
// anchors declared in ABOUT_NAV (introduction, business-activities, partnership-network, vision,
// mission, core-values) so the scroll-spy lines up.
export interface IntroductionContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbAbout: string;
  readonly title: string;
  readonly blocks: readonly InnerContentBlock[];
}

const EN: IntroductionContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbAbout: 'About us',
  title: 'Company Introduction',
  blocks: [
    {
      id: 'introduction',
      heading: 'Sustainable Products – Reliable Supply Chain',
      paragraphs: [
        'Established in 2017, Dai Duong Forest Products Processing Joint Stock Company is an enterprise operating in the processing and exporting of wood products. The company aims for sustainable development and strives to become a trusted partner for both domestic and international customers.',
        'From its earliest days, Dai Duong has built its development strategy upon three core values: Credibility – Quality – Sustainability. The company continuously invests in modern technology, enhances its management capacity, develops its human resources, and builds a stable raw material supply chain to create products that meet the strictest international standards.',
        "With a guiding principle of harmonizing economic efficiency, social responsibility, and environmental protection, Dai Duong is steadily affirming its position as one of the exemplary enterprises in Vietnam's forestry processing industry.",
      ],
    },
    {
      id: 'business-activities',
      heading: 'Business Activities',
      paragraphs: [
        'Dai Duong Forestry Products Processing Joint Stock Company specializes in manufacturing and exporting:',
      ],
      list: [
        'Raw wood chips for the paper industry.',
        'Biomass wood pellets for renewable energy.',
        'Finger-joint wood boards and other deep-processed wood products.',
      ],
    },
    {
      paragraphs: [
        "Currently, the company's products are exported to major markets such as Japan, China, and other nations with high demand for wood materials and biomass energy.",
      ],
    },
    {
      id: 'partnership-network',
      heading: 'Partnership Network and Supply Chain',
      paragraphs: [
        'The company has built a strong collaborative system with partners in the fields of logging, procurement, transportation, and the export of forestry products, forming a stable and sustainable raw material supply chain.',
        'Through a network comprising 16 affiliated units in the Nghi Son Port area and 5 affiliated units in the Song Lam Port area, Dai Duong has the capacity to fulfill large orders with rapid delivery times, consistent quality, and high competitiveness in the international market.',
      ],
    },
    {
      id: 'vision',
      heading: 'Vision',
      paragraphs: [
        "To become Vietnam's leading enterprise in processing and exporting wood and biomass products, contributing to the promotion of a green economy and sustainable development.",
      ],
    },
    {
      id: 'mission',
      heading: 'Mission',
      paragraphs: [
        'To provide high-quality forestry products with legal and sustainable origins; delivering long-term value to customers, partners, employees, and the community.',
      ],
    },
    {
      id: 'core-values',
      heading: 'Core Values',
      paragraphs: [
        '<b>Credibility</b> – Upholding commitments to customers and partners.',
        '<b>Quality</b> – Continuously improving to enhance product and service quality.',
        '<b>Sustainability</b> – Aligning business development with social responsibility and environmental protection.',
        '<b>Innovation</b> – Applying technology and creative thinking to generate new value.',
        '<b>Collaboration</b> – Working alongside partners for mutual and long-term development.',
      ],
    },
  ],
};

const VI: IntroductionContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbAbout: 'Giới thiệu',
  title: 'Giới thiệu công ty',
  blocks: [
    {
      id: 'introduction',
      heading: 'Sản phẩm bền vững – Chuỗi cung ứng tin cậy',
      paragraphs: [
        'Được thành lập năm 2017, Công ty Cổ phần Chế biến Lâm sản Đại Dương là doanh nghiệp hoạt động trong lĩnh vực chế biến và xuất khẩu các sản phẩm gỗ. Công ty hướng đến sự phát triển bền vững và nỗ lực trở thành đối tác tin cậy của cả khách hàng trong nước và quốc tế.',
        'Ngay từ những ngày đầu, Đại Dương đã xây dựng chiến lược phát triển dựa trên ba giá trị cốt lõi: Uy tín – Chất lượng – Bền vững. Công ty không ngừng đầu tư công nghệ hiện đại, nâng cao năng lực quản trị, phát triển nguồn nhân lực và xây dựng chuỗi cung ứng nguyên liệu ổn định để tạo ra những sản phẩm đáp ứng các tiêu chuẩn quốc tế khắt khe nhất.',
        'Với phương châm hài hòa giữa hiệu quả kinh tế, trách nhiệm xã hội và bảo vệ môi trường, Đại Dương đang từng bước khẳng định vị thế là một trong những doanh nghiệp tiêu biểu của ngành chế biến lâm sản Việt Nam.',
      ],
    },
    {
      id: 'business-activities',
      heading: 'Hoạt động kinh doanh',
      paragraphs: ['Công ty Cổ phần Chế biến Lâm sản Đại Dương chuyên sản xuất và xuất khẩu:'],
      list: [
        'Dăm gỗ nguyên liệu cho ngành giấy.',
        'Viên nén gỗ sinh khối cho năng lượng tái tạo.',
        'Ván ghép thanh và các sản phẩm gỗ chế biến sâu khác.',
      ],
    },
    {
      paragraphs: [
        'Hiện nay, sản phẩm của công ty được xuất khẩu đến các thị trường lớn như Nhật Bản, Trung Quốc và nhiều quốc gia khác có nhu cầu cao về nguyên liệu gỗ và năng lượng sinh khối.',
      ],
    },
    {
      id: 'partnership-network',
      heading: 'Mạng lưới đối tác và chuỗi cung ứng',
      paragraphs: [
        'Công ty đã xây dựng hệ thống hợp tác vững mạnh với các đối tác trong các lĩnh vực khai thác, thu mua, vận chuyển và xuất khẩu lâm sản, hình thành chuỗi cung ứng nguyên liệu ổn định và bền vững.',
        'Thông qua mạng lưới gồm 16 đơn vị liên kết tại khu vực Cảng Nghi Sơn và 5 đơn vị liên kết tại khu vực Cảng Sông Lam, Đại Dương có khả năng đáp ứng các đơn hàng lớn với thời gian giao hàng nhanh, chất lượng đồng đều và năng lực cạnh tranh cao trên thị trường quốc tế.',
      ],
    },
    {
      id: 'vision',
      heading: 'Tầm nhìn',
      paragraphs: [
        'Trở thành doanh nghiệp hàng đầu Việt Nam trong lĩnh vực chế biến và xuất khẩu các sản phẩm gỗ và sinh khối, góp phần thúc đẩy nền kinh tế xanh và sự phát triển bền vững.',
      ],
    },
    {
      id: 'mission',
      heading: 'Sứ mệnh',
      paragraphs: [
        'Cung cấp các sản phẩm lâm sản chất lượng cao với nguồn gốc hợp pháp và bền vững; mang lại giá trị lâu dài cho khách hàng, đối tác, người lao động và cộng đồng.',
      ],
    },
    {
      id: 'core-values',
      heading: 'Giá trị cốt lõi',
      paragraphs: [
        '<b>Uy tín</b> – Giữ vững cam kết với khách hàng và đối tác.',
        '<b>Chất lượng</b> – Không ngừng cải tiến để nâng cao chất lượng sản phẩm và dịch vụ.',
        '<b>Bền vững</b> – Gắn phát triển kinh doanh với trách nhiệm xã hội và bảo vệ môi trường.',
        '<b>Đổi mới</b> – Ứng dụng công nghệ và tư duy sáng tạo để tạo ra giá trị mới.',
        '<b>Hợp tác</b> – Đồng hành cùng đối tác vì sự phát triển chung và lâu dài.',
      ],
    },
  ],
};

export function introductionContent(locale: string): IntroductionContent {
  return locale.startsWith('vi') ? VI : EN;
}
