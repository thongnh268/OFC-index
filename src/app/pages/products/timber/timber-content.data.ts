import {
  type ProductContent,
  type ProductSectionId,
} from '../../../shared/components/product-page/product-content.model';

const FINGER_JOINT_BOARD_SECTION_ORDER = [
  'overview',
  'advantage',
  'applications',
  'pictures',
  'why-choose-us',
  'video',
  'faqs',
] as const satisfies readonly ProductSectionId[];

const EN: ProductContent = {
  name: 'Finger Joint Board',
  title: 'Finger Joint Board',
  intro: 'Modern natural wood solutions for interiors and construction.',
  bannerImage: 'assets/images/products/timber-processing-banner.jpg',
  bannerAlt: 'Finger joint board production',
  badges: [
    { icon: 'truck', label: 'Stable Supply' },
    { icon: 'circleCheck', label: 'Consistent Quality' },
    { icon: 'leaf', label: 'Sustainable Source' },
  ],
  overview: [
    'Finger joint boards are a type of wood panel produced from small-sized natural wood strips. After being dried to standard, the strips are joined using mortise and tenon joints and pressed with specialized glue under high pressure to form large, durable, and stable wood panels.',
    'This material is widely used in the furniture, construction, and decoration industries due to its natural wood beauty, good load-bearing capacity, and reduced warping and shrinkage compared to solid wood.',
    'With raw materials from sustainably managed plantations and a modern production process, laminated wood panels not only bring economic benefits but also contribute to protecting forest resources and developing the wood processing industry in a green direction.',
  ],
  overviewImage: null,
  overviewImageAlt: 'Acacia finger joint boards',
  specs: [
    { label: 'Product name', value: 'Acacia wood finger joint board' },
    {
      label: 'Characteristic',
      value:
        'High hardness, beautiful wood grain, natural color, suitable for manufacturing high-end furniture',
    },
    { label: 'Humidity', value: '8 - 12%' },
    { label: 'Glue', value: 'D3 or D4' },
    { label: 'Thickness', value: '12, 15, 18, 20, 24, 30, 40 (mm)' },
    { label: 'Size', value: '1220 × 2440 (mm)\nAs per customer request' },
  ],
  sectionOrder: FINGER_JOINT_BOARD_SECTION_ORDER,
  specsPlacement: 'advantage',
  advantages: [
    'Manufactured from 100% natural wood.',
    'High stability, little warping or cracking.',
    'Good bearing capacity.',
    'Beautiful surface, easy to paint with PU, UV or Melamine coating.',
    'Various sizes and thicknesses.',
    'Environmentally friendly.',
    'More cost-effective than solid wood.',
    'Meets export standards.',
  ],
  applicationsIntro:
    'Thanks to its durable, stable, and environmentally friendly properties, laminated wood panels are widely used in many fields.',
  applications: [
    {
      icon: 'armchair',
      title: 'Home interior',
      description: 'Dining table, Desk, Bed, Wardrobe, Bookshelf, Kitchen cabinet, Dressing table',
    },
    {
      icon: 'ship',
      title: 'Export processing',
      description:
        'Furniture components, Woodworking parts, DIY items, Wooden household goods, Wooden toys, OEM products for the market',
    },
    {
      icon: 'certificate',
      title: 'Interior decoration',
      description: 'Wall cladding, Wooden ceilings, Partition walls, Decorative slats',
    },
    {
      icon: 'ruler',
      title: 'Construction',
      description: 'Stairs, Steps, Handrails, Wooden doors, Door frames',
    },
    {
      icon: 'box',
      title: 'Office interior',
      description: 'Meeting tables, Work desks, Filing cabinets, Reception counters',
    },
  ],
  gallery: [
    {
      src: 'assets/images/products/timber-processing-overview.jpg',
      alt: 'Finger joint board production line',
    },
    {
      src: 'assets/images/products/timber-processing-banner.jpg',
      alt: 'Processed boards inside a timber factory',
    },
    {
      src: 'assets/images/timber-processing.jpeg',
      alt: 'Natural wood strips prepared for processing',
    },
    {
      src: 'assets/images/wood-chips-export.webp',
      alt: 'Natural wood raw material',
    },
  ],
  whyChoose: [
    { icon: 'ship', title: 'Export Success', description: 'Exported to China, Japan, and Korea' },
    {
      icon: 'chartBar',
      title: 'Capacity & Quality',
      description: 'Production capacity of 1 million BDMT/ year',
    },
    {
      icon: 'certificate',
      title: 'Certifications',
      description: 'PEFC FM/COC wood chips certification',
    },
    {
      icon: 'factory',
      title: 'Future Plans',
      description: '$24 million wood chips and pellets factory',
    },
  ],
  videoEyebrow: 'OFC Company',
  videoTitle: 'A Leading Wood Chips Producer',
  videoParagraphs: [
    'OFC Company, based in Vietnam, has emerged as a prominent player in the wood chips market.',
    'With a commitment to sustainable forestry practices, they have become a reliable supplier of high-quality wood chips to international markets.',
  ],
  videoUrl: 'https://youtu.be/WkkrT7kubzE',
  videoThumbnail: null,
  faqs: [
    {
      question: 'What is a finger joint board?',
      answer:
        'It is an engineered wood panel made by joining kiln-dried natural wood strips with finger joints and specialized adhesive under pressure.',
    },
    {
      question: 'What wood and glue are used?',
      answer:
        'The boards are made from natural acacia wood and use D3 or D4 adhesive depending on the required application.',
    },
    {
      question: 'What sizes and thicknesses are available?',
      answer:
        'The standard panel size is 1220 × 2440 mm, with thicknesses from 12 to 40 mm. Custom specifications are available on request.',
    },
    {
      question: 'Where can finger joint boards be used?',
      answer:
        'They are suitable for home and office furniture, interior decoration, stairs, doors, frames, DIY items and export furniture components.',
    },
    {
      question: 'Are the boards suitable for export?',
      answer:
        'Yes. The boards are manufactured from sustainably sourced wood and can be produced to customer and export-market requirements.',
    },
  ],
};

const VI: ProductContent = {
  name: 'Ván ghép thanh',
  title: 'Ván ghép thanh',
  intro: 'Giải pháp gỗ tự nhiên hiện đại cho nội thất và xây dựng.',
  bannerImage: 'assets/images/products/timber-processing-banner.jpg',
  bannerAlt: 'Sản xuất ván ghép thanh',
  badges: [
    { icon: 'truck', label: 'Cung cấp ổn định' },
    { icon: 'circleCheck', label: 'Chất lượng nhất quán' },
    { icon: 'leaf', label: 'Nguồn cung bền vững' },
  ],
  overview: [
    'Ván ghép thanh là loại gỗ tấm được sản xuất từ các thanh gỗ tự nhiên có kích thước nhỏ. Sau khi được sấy khô đạt tiêu chuẩn, các thanh gỗ được ghép nối bằng mộng răng cưa và ép bằng keo chuyên dụng dưới áp lực cao để tạo thành tấm gỗ lớn có độ bền và tính ổn định cao.',
    'Đây là dòng vật liệu được sử dụng phổ biến trong ngành nội thất, xây dựng và trang trí nhờ sở hữu vẻ đẹp tự nhiên của gỗ, khả năng chịu lực tốt và hạn chế cong vênh, co ngót so với gỗ nguyên khối.',
    'Với nguồn nguyên liệu từ rừng trồng được quản lý bền vững cùng quy trình sản xuất hiện đại, ván ghép thanh không chỉ mang lại hiệu quả kinh tế mà còn góp phần bảo vệ tài nguyên rừng và phát triển ngành chế biến gỗ theo hướng xanh.',
  ],
  overviewImage: null,
  overviewImageAlt: 'Ván ghép thanh gỗ keo',
  specs: [
    { label: 'Tên sản phẩm', value: 'Ván ghép thanh gỗ keo' },
    {
      label: 'Đặc tính',
      value: 'Độ cứng cao, vân gỗ đẹp, màu sắc tự nhiên, phù hợp sản xuất nội thất cao cấp',
    },
    { label: 'Độ ẩm', value: '8 - 12%' },
    { label: 'Keo', value: 'D3 hoặc D4' },
    { label: 'Độ dày', value: '12, 15, 18, 20, 24, 30, 40 (mm)' },
    { label: 'Kích thước', value: '1220 × 2440 (mm)\nTheo yêu cầu khách hàng' },
  ],
  sectionOrder: FINGER_JOINT_BOARD_SECTION_ORDER,
  specsPlacement: 'advantage',
  advantages: [
    'Được sản xuất từ 100% gỗ tự nhiên.',
    'Độ ổn định cao, ít cong vênh, nứt nẻ.',
    'Khả năng chịu lực tốt.',
    'Bề mặt đẹp, dễ sơn PU, UV hoặc phủ Melamine.',
    'Đa dạng kích thước và độ dày.',
    'Thân thiện với môi trường.',
    'Tiết kiệm chi phí hơn so với gỗ nguyên khối.',
    'Đáp ứng tiêu chuẩn xuất khẩu.',
  ],
  applicationsIntro:
    'Nhờ đặc tính bền đẹp, ổn định và thân thiện với môi trường, ván ghép thanh được ứng dụng rộng rãi trong nhiều lĩnh vực.',
  applications: [
    {
      icon: 'armchair',
      title: 'Nội thất gia đình',
      description: 'Bàn ăn, Bàn làm việc, Giường ngủ, Tủ quần áo, Kệ sách, Tủ bếp, Bàn trang điểm',
    },
    {
      icon: 'ship',
      title: 'Gia công xuất khẩu',
      description:
        'Linh kiện nội thất, Chi tiết đồ gỗ, Đồ DIY, Đồ gia dụng bằng gỗ, Đồ chơi gỗ, Hàng OEM cho thị trường',
    },
    {
      icon: 'certificate',
      title: 'Trang trí nội thất',
      description: 'Ốp tường, Trần gỗ, Vách ngăn, Lam trang trí',
    },
    {
      icon: 'ruler',
      title: 'Xây dựng',
      description: 'Cầu thang, Bậc tam cấp, Tay vịn, Cửa gỗ, Khung cửa',
    },
    {
      icon: 'box',
      title: 'Nội thất văn phòng',
      description: 'Bàn họp, Bàn làm việc, Tủ hồ sơ, Quầy lễ tân',
    },
  ],
  gallery: [
    {
      src: 'assets/images/products/timber-processing-overview.jpg',
      alt: 'Dây chuyền sản xuất ván ghép thanh',
    },
    {
      src: 'assets/images/products/timber-processing-banner.jpg',
      alt: 'Ván gỗ đã qua chế biến trong nhà máy',
    },
    {
      src: 'assets/images/timber-processing.jpeg',
      alt: 'Thanh gỗ tự nhiên chuẩn bị gia công',
    },
    {
      src: 'assets/images/wood-chips-export.webp',
      alt: 'Nguyên liệu gỗ tự nhiên',
    },
  ],
  whyChoose: [
    {
      icon: 'ship',
      title: 'Xuất khẩu thành công',
      description: 'Đã xuất khẩu sang Trung Quốc, Nhật Bản và Hàn Quốc',
    },
    {
      icon: 'chartBar',
      title: 'Công suất & chất lượng',
      description: 'Công suất sản xuất 1 triệu BDMT/năm',
    },
    {
      icon: 'certificate',
      title: 'Chứng nhận',
      description: 'Chứng nhận PEFC FM/COC cho dăm gỗ',
    },
    {
      icon: 'factory',
      title: 'Kế hoạch tương lai',
      description: 'Nhà máy dăm gỗ và viên nén trị giá 24 triệu USD',
    },
  ],
  videoEyebrow: 'OFC Company',
  videoTitle: 'Nhà sản xuất dăm gỗ hàng đầu',
  videoParagraphs: [
    'OFC Company, có trụ sở tại Việt Nam, đã trở thành một tên tuổi nổi bật trên thị trường dăm gỗ.',
    'Với cam kết về lâm nghiệp bền vững, công ty đã trở thành nhà cung cấp dăm gỗ chất lượng cao đáng tin cậy cho thị trường quốc tế.',
  ],
  videoUrl: 'https://youtu.be/WkkrT7kubzE',
  videoThumbnail: null,
  faqs: [
    {
      question: 'Ván ghép thanh là gì?',
      answer:
        'Ván ghép thanh là tấm gỗ kỹ thuật được tạo từ các thanh gỗ tự nhiên đã sấy, ghép bằng mộng răng cưa và keo chuyên dụng dưới áp lực cao.',
    },
    {
      question: 'Ván sử dụng loại gỗ và keo nào?',
      answer:
        'Sản phẩm được làm từ gỗ keo tự nhiên và sử dụng keo D3 hoặc D4 tùy theo yêu cầu ứng dụng.',
    },
    {
      question: 'Có những kích thước và độ dày nào?',
      answer:
        'Kích thước tiêu chuẩn là 1220 × 2440 mm, độ dày từ 12 đến 40 mm. Chúng tôi có thể sản xuất theo yêu cầu riêng.',
    },
    {
      question: 'Ván ghép thanh được dùng ở đâu?',
      answer:
        'Sản phẩm phù hợp cho nội thất gia đình và văn phòng, trang trí, cầu thang, cửa, khung cửa, đồ DIY và linh kiện nội thất xuất khẩu.',
    },
    {
      question: 'Sản phẩm có phù hợp xuất khẩu không?',
      answer:
        'Có. Ván được sản xuất từ nguồn gỗ bền vững và có thể đáp ứng các yêu cầu kỹ thuật của khách hàng và thị trường xuất khẩu.',
    },
  ],
};

export function timberContent(locale: string): ProductContent {
  return locale.startsWith('vi') ? VI : EN;
}
