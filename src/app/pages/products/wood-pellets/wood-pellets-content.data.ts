import {
  type ProductContent,
  type ProductSectionId,
} from '../../../shared/components/product-page/product-content.model';

const WOOD_PELLETS_SECTION_ORDER = [
  'overview',
  'advantage',
  'production-process',
  'products',
  'applications',
  'quality-commitment',
  'pictures',
  'why-choose-us',
  'video',
  'faqs',
] as const satisfies readonly ProductSectionId[];

// Code-owned bilingual content for the Wood Pellets page (Figma node 2142:1503).
// Title, intro, badges, overview, specs and applications are real design content. Why-choose,
// the video blurb and `videoUrl` are shared OFC/company content carried across product pages
// (placeholder video - swap for the real link). FAQ is neutral OFC-grounded provisional copy
// (Milestones approach). The overview image is intentionally omitted for the text-first layout.

const EN: ProductContent = {
  name: 'Wood Pellets',
  title: 'Wood Pellets',
  intro: 'Green energy sources for a sustainable future.',
  bannerImage: 'assets/images/products/wood-pellets-banner.jpg',
  bannerAlt: 'Wood pellets export',
  badges: [
    { icon: 'truck', label: 'Stable Supply' },
    { icon: 'circleCheck', label: 'Consistent Quality' },
    { icon: 'leaf', label: 'Sustainable Source' },
  ],
  overview: [
    'Wood pellets are a type of biofuel produced from sawdust, wood shavings, wood chips, and by-products of the wood processing industry. Through a process of grinding, drying, high-pressure compression, and cooling, the raw materials are formed into uniform pellets with high density, low moisture content, and high calorific value.',
    'Without the use of chemicals or binders, wood pellets utilize the natural lignin in wood to bind the material particles, creating a product with high mechanical strength and environmental friendliness.',
    'In the context of a global effort to reduce greenhouse gas emissions and replace fossil fuels, wood pellets have become one of the widely used renewable energy sources in Japan, South Korea, Europe, and many other countries.',
  ],
  overviewImage: null,
  overviewImageAlt: 'Wood pellet production line',
  specs: [
    { label: 'Product name', value: 'Wood pellets' },
    { label: 'Diameter', value: '6 mm or 8 mm' },
    { label: 'Humidity', value: '≤ 10%' },
    { label: 'Ash content', value: '≤ 1.5% (depending on the ingredients)' },
    {
      label: 'Calorific value',
      value: '≈ 4,300–4,800 kcal/kg (≈ 18–20 MJ/kg, depending on the ingredients)',
    },
    { label: 'Mechanical strength', value: '≥ 97.5%' },
    { label: 'Density', value: '≥ 600 kg/m³' },
  ],
  sectionOrder: WOOD_PELLETS_SECTION_ORDER,
  specsPlacement: 'advantage',
  advantages: [
    'Made from 100% natural wood biomass.',
    'Renewable and sustainable raw material source.',
    'Low ash content and clean combustion.',
    'High calorific value and stable combustion efficiency.',
    'Low moisture content enhances efficiency.',
    'Easy to transport, store, and handle.',
    'Minimal dust generation during use.',
    'Reduces CO₂ emissions compared to fossil fuels.',
    'Contributes to the goal of circular economy development and carbon emission reduction.',
  ],
  productionProcess: {
    steps: [
      'Purchasing and inspecting raw materials',
      'Screening for impurities',
      'Grinding raw materials',
      'Drying to standard moisture content',
      'Pelletizing using a high-capacity pressing system',
      'Cooling the pellets',
      'Screening for dust and defective pellets',
      'Packaging or shipping in bulk',
      'Quality control before delivery',
    ],
    note: 'Each stage is monitored to meet the technical requirements of domestic and international customers.',
  },
  productLinesIntro:
    'Dai Duong Wood Pellet Factory offers product lines tailored to the needs of various markets and boiler systems.',
  productLines: [
    {
      title: '6 mm wood pellets',
      details: [
        'Diameter: 6 mm',
        'Suitable for industrial boilers, heating systems, and some domestic appliances',
        'Markets: Japan, South Korea, Europe, and other markets upon request',
      ],
    },
    {
      title: '8 mm wood pellets',
      details: ['Diameter: 8 mm', 'Suitable for biomass power plants and large-capacity boilers'],
    },
    {
      title: 'Export-grade pellets',
      description: 'Manufactured to customer specifications regarding:',
      details: [
        'Size',
        'Moisture content',
        'Mechanical strength',
        'Ash content',
        'Packaging specifications',
        'Technical standards',
      ],
    },
  ],
  applicationsIntro:
    'Biomass pellets are widely used in many fields due to their ability to provide stable heat and reduce emissions.',
  applicationColumns: 2,
  applications: [
    {
      icon: 'bolt',
      title: 'Electricity production',
      details: [
        'Fuel for biomass power plants',
        'Co-combustion with coal in thermal power plants to reduce CO₂ emissions',
      ],
    },
    {
      icon: 'factory',
      title: 'Industrial boilers',
      description:
        'Food industry, textile industry, paper industry, woodworking chair industry, seafood industry, and chemical industry',
    },
    {
      icon: 'home',
      title: 'Heating systems',
      description:
        'Heating systems for hotels, resorts, industrial greenhouses, livestock farms, and households in countries with cold climates',
    },
    {
      icon: 'warehouse',
      title: 'Renewable energy',
      details: [
        'Replacing coal, fuel oil, and liquefied natural gas (LNG) in many industrial applications',
        'Supporting businesses in achieving carbon emission reduction targets and transitioning to clean energy',
      ],
    },
  ],
  qualityCommitment: {
    intro:
      'Dai Duong Wood Pellet Factory aims to become a reputable supplier of biofuels to both domestic and international markets. We are committed to:',
    details: [
      'Using legally sourced and traceable wood raw materials.',
      'Complying with sustainable forest management standards such as FSC and PEFC for raw materials within the scope of certification.',
      'Applying a rigorous quality control system throughout the entire production process.',
      'Ensuring consistent quality according to customer requirements and contracts.',
      'Delivering on schedule and meeting logistics and export requirements.',
      'Partnering with customers on their journey to renewable energy and sustainable development.',
    ],
  },
  gallery: [
    {
      src: 'assets/images/products/wood-pellets-overview.webp',
      alt: 'Finished wood pellets',
    },
    {
      src: 'assets/images/wood-pellets-export.jpg',
      alt: 'Wood pellet quality inspection',
    },
    {
      src: 'assets/images/products/wood-pellets-banner.jpg',
      alt: 'Wood pellets made from natural biomass',
    },
    {
      src: 'assets/images/wood-chips-export.webp',
      alt: 'Wood-chip raw material used in pellet production',
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
  videoUrl: 'https://youtu.be/6Fs5kLkIDzY',
  videoThumbnail: null,
  faqs: [
    {
      question: 'What are wood pellets?',
      answer:
        'Wood pellets are compressed cylinders of dried acacia wood fibre extruded through 8 mm dies. The wood’s natural lignin binds them, so no glue or chemical additives are needed.',
    },
    {
      question: 'What heating value do they deliver?',
      answer:
        'Our pellets have a calorific value above 4,200 kcal/kg with low ash (< 3%) and high durability (> 96.5%), making them an efficient, clean-burning fuel.',
    },
    {
      question: 'What sizes do you offer?',
      answer:
        'Standard diameters are 6, 8 or 10 mm with lengths of 10–50 mm; we can tailor specifications to your equipment.',
    },
    {
      question: 'Are the pellets certified and sustainably sourced?',
      answer:
        'Yes - they are made from sustainably grown acacia and our supply chain holds PEFC FM/COC certification.',
    },
    {
      question: 'What are your order and payment terms?',
      answer:
        'We export in bulk to China, Japan and Korea and accept T/T and L/C at sight. Contact us for a detailed quotation.',
    },
  ],
};

const VI: ProductContent = {
  name: 'Viên nén khối sinh học',
  title: 'Viên nén khối sinh học',
  intro: 'Nguồn năng lượng xanh cho tương lai bền vững.',
  bannerImage: 'assets/images/products/wood-pellets-banner.jpg',
  bannerAlt: 'Viên nén khối sinh học',
  badges: [
    { icon: 'truck', label: 'Cung cấp ổn định' },
    { icon: 'circleCheck', label: 'Chất lượng nhất quán' },
    { icon: 'leaf', label: 'Nguồn bền vững' },
  ],
  overview: [
    'Viên nén khối sinh học (Wood Pellets) là nhiên liệu sinh học được sản xuất từ mùn cưa, dăm bào, gỗ vụn và các phụ phẩm của ngành chế biến gỗ. Thông qua quy trình nghiền, sấy, ép nén dưới áp suất cao và làm nguội, nguyên liệu được tạo thành những viên nén đồng đều, có mật độ cao, độ ẩm thấp và giá trị nhiệt lớn.',
    'Không sử dụng hóa chất hay chất kết dính, viên nén sinh học tận dụng chính lignin tự nhiên có trong gỗ để liên kết các hạt nguyên liệu, tạo ra sản phẩm có độ bền cơ học cao và thân thiện với môi trường.',
    'Trong bối cảnh toàn cầu hướng tới giảm phát thải khí nhà kính và thay thế nhiên liệu hóa thạch, viên nén khối sinh học đã trở thành một trong những nguồn năng lượng tái tạo được sử dụng rộng rãi tại Nhật Bản, Hàn Quốc, Châu Âu và nhiều quốc gia khác.',
  ],
  overviewImage: null,
  overviewImageAlt: 'Dây chuyền sản xuất viên nén gỗ',
  specs: [
    { label: 'Tên sản phẩm', value: 'Viên nén gỗ sinh học' },
    { label: 'Đường kính', value: '6mm hoặc 8mm' },
    { label: 'Độ ẩm', value: '≤ 10%' },
    { label: 'Hàm lượng tro', value: '≤ 1,5% (tùy nguyên liệu)' },
    {
      label: 'Nhiệt trị',
      value: '≈ 4.300–4.800 kcal/kg (≈ 18–20 MJ/kg, tùy nguyên liệu)',
    },
    { label: 'Độ bền cơ học', value: '≥ 97,5%' },
    { label: 'Khối lượng riêng', value: '≥ 600 kg/m³' },
  ],
  sectionOrder: WOOD_PELLETS_SECTION_ORDER,
  specsPlacement: 'advantage',
  advantages: [
    'Sản xuất từ 100% sinh khối gỗ tự nhiên.',
    'Nguồn nguyên liệu tái tạo và bền vững.',
    'Hàm lượng tro thấp, cháy sạch.',
    'Giá trị nhiệt cao, hiệu suất đốt ổn định.',
    'Độ ẩm thấp giúp tăng hiệu quả sử dụng.',
    'Dễ dàng vận chuyển, lưu kho và bốc xếp.',
    'Ít phát sinh bụi trong quá trình sử dụng.',
    'Giảm phát thải CO₂ so với nhiên liệu hóa thạch.',
    'Góp phần thực hiện mục tiêu phát triển kinh tế tuần hoàn và giảm phát thải carbon.',
  ],
  productionProcess: {
    steps: [
      'Thu mua và kiểm tra nguyên liệu',
      'Sàng lọc tạp chất',
      'Nghiền nguyên liệu',
      'Sấy đạt độ ẩm tiêu chuẩn',
      'Ép viên bằng hệ thống máy ép công suất lớn',
      'Làm nguội viên nén',
      'Sàng loại bụi và viên lỗi',
      'Đóng gói hoặc xuất hàng rời',
      'Kiểm soát chất lượng trước khi giao hàng',
    ],
    note: 'Mỗi giai đoạn đều được giám sát để đáp ứng các yêu cầu kỹ thuật của khách hàng trong và ngoài nước.',
  },
  productLinesIntro:
    'Nhà máy Viên nén sinh khối Đại Dương cung cấp các dòng sản phẩm phù hợp với nhu cầu của nhiều thị trường và hệ thống lò hơi khác nhau.',
  productLines: [
    {
      title: 'Viên nén gỗ 6 mm',
      details: [
        'Đường kính 6mm',
        'Phù hợp cho lò hơi công nghiệp, hệ thống sưởi và một số thiết bị dân dụng',
        'Thị trường: Nhật Bản, Hàn Quốc, Châu Âu và các thị trường khác theo yêu cầu',
      ],
    },
    {
      title: 'Viên nén gỗ 8 mm',
      details: ['Đường kính 8mm', 'Phù hợp cho nhà máy điện sinh khối và lò hơi công suất lớn'],
    },
    {
      title: 'Viên nén tiêu chuẩn xuất khẩu',
      description: 'Được sản xuất theo yêu cầu riêng của khách hàng về:',
      details: [
        'Kích thước',
        'Độ ẩm',
        'Độ bền cơ học',
        'Hàm lượng tro',
        'Quy cách đóng gói',
        'Tiêu chuẩn kỹ thuật',
      ],
    },
  ],
  applicationsIntro:
    'Viên nén khối sinh học được sử dụng rộng rãi trong nhiều lĩnh vực nhờ khả năng cung cấp nhiệt ổn định và giảm phát thải.',
  applicationColumns: 2,
  applications: [
    {
      icon: 'bolt',
      title: 'Sản xuất điện',
      details: [
        'Nhiên liệu cho nhà máy điện sinh khối',
        'Đồng đốt với than trong các nhà máy nhiệt điện nhằm giảm lượng phát thải CO₂',
      ],
    },
    {
      icon: 'factory',
      title: 'Lò hơi công nghiệp',
      description:
        'Ngành thực phẩm, ngành dệt may, ngành giấy, ngành chế biến gỗ, ngành thủy sản, ngành hóa chất',
    },
    {
      icon: 'home',
      title: 'Hệ thống sưởi',
      description:
        'Hệ thống sưởi cho khách sạn, khu nghỉ dưỡng, nhà kính công nghiệp, trang trại chăn nuôi, hộ gia đình tại các quốc gia có khí hậu lạnh',
    },
    {
      icon: 'warehouse',
      title: 'Năng lượng tái tạo',
      details: [
        'Thay thế than đá, dầu FO và khí hóa lỏng (LNG) trong nhiều ứng dụng công nghiệp',
        'Hỗ trợ doanh nghiệp thực hiện các mục tiêu giảm phát thải carbon và chuyển đổi sang năng lượng sạch',
      ],
    },
  ],
  qualityCommitment: {
    intro:
      'Nhà máy Viên nén sinh khối Đại Dương định hướng trở thành nhà cung cấp nhiên liệu sinh học uy tín cho thị trường trong nước và quốc tế. Chúng tôi cam kết:',
    details: [
      'Sử dụng nguồn nguyên liệu gỗ hợp pháp và có thể truy xuất nguồn gốc.',
      'Tuân thủ các tiêu chuẩn về quản lý rừng bền vững như FSC và PEFC (đối với nguồn nguyên liệu thuộc phạm vi chứng nhận).',
      'Áp dụng hệ thống kiểm soát chất lượng nghiêm ngặt trong toàn bộ quá trình sản xuất.',
      'Đảm bảo chất lượng ổn định theo yêu cầu của khách hàng và hợp đồng.',
      'Giao hàng đúng tiến độ, đáp ứng các yêu cầu về logistics và xuất khẩu.',
      'Đồng hành cùng khách hàng trong hành trình chuyển đổi sang năng lượng tái tạo và phát triển bền vững.',
    ],
  },
  gallery: [
    {
      src: 'assets/images/products/wood-pellets-overview.webp',
      alt: 'Viên nén gỗ thành phẩm',
    },
    {
      src: 'assets/images/wood-pellets-export.jpg',
      alt: 'Kiểm tra chất lượng viên nén gỗ',
    },
    {
      src: 'assets/images/products/wood-pellets-banner.jpg',
      alt: 'Viên nén gỗ từ sinh khối tự nhiên',
    },
    {
      src: 'assets/images/wood-chips-export.webp',
      alt: 'Nguyên liệu dăm gỗ dùng trong sản xuất viên nén',
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
    { icon: 'certificate', title: 'Chứng nhận', description: 'Chứng nhận PEFC FM/COC cho dăm gỗ' },
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
  videoUrl: 'https://youtu.be/6Fs5kLkIDzY',
  videoThumbnail: null,
  faqs: [
    {
      question: 'Viên nén gỗ là gì?',
      answer:
        'Viên nén gỗ là những thanh trụ nén từ sợi gỗ keo khô, ép qua khuôn 8 mm. Lignin tự nhiên trong gỗ kết dính chúng nên không cần keo hay phụ gia hóa học.',
    },
    {
      question: 'Nhiệt trị của viên nén là bao nhiêu?',
      answer:
        'Viên nén của chúng tôi có nhiệt trị trên 4.200 kcal/kg, hàm lượng tro thấp (< 3%) và độ bền cao (> 96,5%), là nhiên liệu sạch và hiệu quả.',
    },
    {
      question: 'Có những kích cỡ nào?',
      answer:
        'Đường kính tiêu chuẩn 6, 8 hoặc 10 mm, chiều dài 10–50 mm; chúng tôi có thể điều chỉnh theo thiết bị của bạn.',
    },
    {
      question: 'Viên nén có chứng nhận và nguồn bền vững không?',
      answer:
        'Có - được làm từ gỗ keo trồng bền vững và chuỗi cung ứng đạt chứng nhận PEFC FM/COC.',
    },
    {
      question: 'Điều khoản đặt hàng và thanh toán?',
      answer:
        'Chúng tôi xuất khẩu số lượng lớn sang Trung Quốc, Nhật Bản và Hàn Quốc, chấp nhận T/T và L/C trả ngay. Hãy liên hệ để nhận báo giá.',
    },
  ],
};

export function woodPelletsContent(locale: string): ProductContent {
  return locale.startsWith('vi') ? VI : EN;
}
