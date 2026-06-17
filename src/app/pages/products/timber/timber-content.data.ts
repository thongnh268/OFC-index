import { type ProductContent } from '../../../shared/components/product-page/product-content.model';

// Code-owned bilingual content for the Timber Processing & Export page (Figma node 2142:1041).
// Application card descriptions were read from the high-res design screenshots (baked into a
// raster image in Figma). Why-choose, the video blurb and `videoUrl` are shared OFC content
// carried across product pages (placeholder video — swap for the real link). FAQ is neutral
// OFC-grounded provisional copy. Banner/overview images stay null → styled placeholders.

const EN: ProductContent = {
  name: 'Timber Processing',
  title: 'Timber Processing & Export',
  intro:
    'We produce and export premium sawn timber, veneer, and processed lumber. Our modern Vietnamese facilities ensure reliable supply, consistent quality, and sustainable sourcing for global furniture and construction markets.',
  bannerImage: 'assets/images/products/timber-processing-banner.jpg',
  bannerAlt: 'Timber processing and export',
  badges: [
    { icon: 'truck', label: 'Stable Supply' },
    { icon: 'circleCheck', label: 'Consistent Quality' },
    { icon: 'leaf', label: 'Sustainable Source' },
  ],
  overview: [
    'Timber processing transforms raw, harvested logs into a vast array of structural, industrial, and consumer goods. The journey requires four primary manufacturing methods: sawing, peeling, stranding, and chipping. It is a heavily automated industry that balances material recovery, sustainability, and technological innovation.',
  ],
  overviewImage: 'assets/images/products/timber-processing-overview.jpg',
  overviewImageAlt: 'Processed sawn timber stacked for export',
  specs: [
    { label: 'Product Name', value: 'Timber processing' },
    { label: 'Moisture', value: '8-12% (Indoor/Kiln-Dried)' },
    { label: 'Dimensions', value: 'Nominal' },
    { label: 'Dimensional Tolerances', value: '±0.5mm, ±1.0mm.' },
    { label: 'Surface Finish', value: '2 Sides, 4 Sides' },
    { label: 'Timber Grading', value: 'FAS, #1 Common (Appearance); C16, C24 (Structural).' },
    { label: 'Defect Tolerances', value: 'Limits on knots' },
    { label: 'Density', value: '400 - 750 kg/m³' },
    { label: 'Treatment', value: 'Heat treated - ISPM 15' },
  ],
  applicationsIntro: 'Our processed timber is widely used in multiple industries.',
  applications: [
    {
      icon: 'ruler',
      title: 'Structural Framing',
      description:
        'High-strength lumber for durable, code-compliant home and commercial construction.',
    },
    {
      icon: 'box',
      title: 'Engineered Plywood Panels',
      description: 'Reusable forms, subflooring, and paneling for construction projects.',
    },
    {
      icon: 'wood',
      title: 'Premium Solid Wood Flooring',
      description: 'Processed lumber for elegant, long-lasting interior surface finishes.',
    },
    {
      icon: 'tools',
      title: 'Fine Millwork & Joinery',
      description: 'Processed lumber for custom doors, windows, stairs, and decorative trim.',
    },
    {
      icon: 'armchair',
      title: 'High-End Furniture Making',
      description: 'Clean-processed lumber for cabinets, furniture, and cabinetry.',
    },
    {
      icon: 'packages',
      title: 'Industrial Timber Pallets & Crates',
      description:
        'Reusable, standardized timber for efficient, cost-effective shipping materials.',
    },
    {
      icon: 'tree',
      title: 'Outdoor Decking & Boundaries',
      description:
        'Weather-resistant processed timber for enduring outdoor living and boundary fences.',
    },
    {
      icon: 'shieldCheck',
      title: 'Treated Structural Components',
      description:
        'Pressure-treated wood for durability in construction and infrastructure projects.',
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
      question: 'What timber products do you process?',
      answer:
        'We produce sawn timber, veneer and processed lumber for furniture, joinery, flooring, packaging and construction.',
    },
    {
      question: 'What grades and dimensions are available?',
      answer:
        'We supply FAS and #1 Common appearance grades and C16/C24 structural grades, at nominal dimensions with ±0.5–1.0 mm tolerances.',
    },
    {
      question: 'How is the timber dried and treated?',
      answer:
        'Timber is kiln-dried to 8–12% moisture and heat-treated to ISPM 15 for international shipping.',
    },
    {
      question: 'Is your timber sustainably sourced?',
      answer:
        'Yes — our supply chain is PEFC FM/COC certified, ensuring legal and responsibly managed timber.',
    },
  ],
};

const VI: ProductContent = {
  name: 'Chế biến gỗ',
  title: 'Chế biến & xuất khẩu gỗ',
  intro:
    'Chúng tôi sản xuất và xuất khẩu gỗ xẻ, ván lạng và gỗ chế biến cao cấp. Các nhà máy hiện đại tại Việt Nam đảm bảo nguồn cung ổn định, chất lượng đồng đều và khai thác bền vững cho thị trường nội thất và xây dựng toàn cầu.',
  bannerImage: 'assets/images/products/timber-processing-banner.jpg',
  bannerAlt: 'Chế biến và xuất khẩu gỗ',
  badges: [
    { icon: 'truck', label: 'Nguồn cung ổn định' },
    { icon: 'circleCheck', label: 'Chất lượng đồng đều' },
    { icon: 'leaf', label: 'Khai thác bền vững' },
  ],
  overview: [
    'Chế biến gỗ biến những khúc gỗ khai thác thô thành vô số sản phẩm kết cấu, công nghiệp và tiêu dùng. Quá trình này gồm bốn phương pháp chính: xẻ, lạng, bóc và băm. Đây là ngành tự động hóa cao, cân bằng giữa thu hồi nguyên liệu, tính bền vững và đổi mới công nghệ.',
  ],
  overviewImage: 'assets/images/products/timber-processing-overview.jpg',
  overviewImageAlt: 'Gỗ xẻ chế biến xếp chờ xuất khẩu',
  specs: [
    { label: 'Tên sản phẩm', value: 'Chế biến gỗ' },
    { label: 'Độ ẩm', value: '8-12% (trong nhà/sấy lò)' },
    { label: 'Kích thước', value: 'Danh nghĩa' },
    { label: 'Dung sai kích thước', value: '±0.5mm, ±1.0mm.' },
    { label: 'Hoàn thiện bề mặt', value: '2 mặt, 4 mặt' },
    { label: 'Phân loại gỗ', value: 'FAS, #1 Common (thẩm mỹ); C16, C24 (kết cấu).' },
    { label: 'Dung sai khuyết tật', value: 'Giới hạn mắt gỗ' },
    { label: 'Khối lượng riêng', value: '400 - 750 kg/m³' },
    { label: 'Xử lý', value: 'Sấy nhiệt - ISPM 15' },
  ],
  applicationsIntro: 'Gỗ chế biến của chúng tôi được sử dụng rộng rãi trong nhiều ngành.',
  applications: [
    {
      icon: 'ruler',
      title: 'Khung kết cấu',
      description: 'Gỗ cường độ cao cho công trình nhà ở và thương mại bền vững, đạt chuẩn.',
    },
    {
      icon: 'box',
      title: 'Ván ép kỹ thuật',
      description: 'Cốp pha, ván sàn lót và ván ốp cho công trình xây dựng.',
    },
    {
      icon: 'wood',
      title: 'Sàn gỗ tự nhiên cao cấp',
      description: 'Gỗ chế biến cho bề mặt nội thất sang trọng, bền lâu.',
    },
    {
      icon: 'tools',
      title: 'Mộc tinh & ghép nối',
      description: 'Gỗ chế biến cho cửa, cửa sổ, cầu thang và phào trang trí theo yêu cầu.',
    },
    {
      icon: 'armchair',
      title: 'Sản xuất nội thất cao cấp',
      description: 'Gỗ chế biến sạch cho tủ, đồ nội thất và tủ bếp.',
    },
    {
      icon: 'packages',
      title: 'Pallet & thùng gỗ công nghiệp',
      description: 'Gỗ tiêu chuẩn, tái sử dụng cho vật liệu đóng gói tiết kiệm.',
    },
    {
      icon: 'tree',
      title: 'Sàn & hàng rào ngoài trời',
      description: 'Gỗ chế biến chịu thời tiết cho không gian ngoài trời và hàng rào bền bỉ.',
    },
    {
      icon: 'shieldCheck',
      title: 'Cấu kiện kết cấu đã xử lý',
      description: 'Gỗ xử lý áp lực cho độ bền trong xây dựng và hạ tầng.',
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
  videoUrl: 'https://youtu.be/WkkrT7kubzE',
  videoThumbnail: null,
  faqs: [
    {
      question: 'Quý công ty chế biến những sản phẩm gỗ nào?',
      answer:
        'Chúng tôi sản xuất gỗ xẻ, ván lạng và gỗ chế biến cho nội thất, mộc, sàn, đóng gói và xây dựng.',
    },
    {
      question: 'Có những cấp và kích thước nào?',
      answer:
        'Chúng tôi cung cấp cấp thẩm mỹ FAS và #1 Common, cấp kết cấu C16/C24, kích thước danh nghĩa với dung sai ±0,5–1,0 mm.',
    },
    {
      question: 'Gỗ được sấy và xử lý thế nào?',
      answer: 'Gỗ được sấy lò xuống độ ẩm 8–12% và xử lý nhiệt theo ISPM 15 để vận chuyển quốc tế.',
    },
    {
      question: 'Gỗ có nguồn bền vững không?',
      answer:
        'Có — chuỗi cung ứng đạt chứng nhận PEFC FM/COC, đảm bảo gỗ hợp pháp và quản lý có trách nhiệm.',
    },
  ],
};

export function timberContent(locale: string): ProductContent {
  return locale.startsWith('vi') ? VI : EN;
}
