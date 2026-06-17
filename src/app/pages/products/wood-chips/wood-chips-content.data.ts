import { type ProductContent } from '../../../shared/components/product-page/product-content.model';

// Code-owned bilingual content for the Wood Chips Export product page (Figma node 2142:1769).
// Title, intro, badges, overview, specs, applications, why-choose-us and the video blurb are
// real content from the design. The FAQ is provisional: Figma ships only "What are wood
// chips?" ×10, so the Q&A below is neutral, OFC-grounded placeholder copy (per the Milestones
// approach) — replace with the real FAQ when available. Banner/overview images stay null →
// styled placeholders until real assets arrive. `videoUrl` is a PLACEHOLDER YouTube link
// (Blender's public-domain "Big Buck Bunny") so the player renders now — swap it for OFC's
// real video link (any youtube.com/watch, youtu.be, shorts or embed URL works).

const EN: ProductContent = {
  name: 'Wood Chips Export',
  title: 'Wood Chips Export',
  intro:
    'We provide high-quality acacia wood chips for pulp, paper and energy industries. Stable supply, consistent quality and sustainable sourcing from Vietnam.',
  bannerImage: 'assets/images/products/wood-chips-banner.jpg',
  bannerAlt: 'Wood chips export',
  badges: [
    { icon: 'truck', label: 'Stable Supply' },
    { icon: 'circleCheck', label: 'Consistent Quality' },
    { icon: 'leaf', label: 'Sustainable Source' },
  ],
  overview: [
    'With the goal of becoming the largest wood chip exporter in Vietnam, OFC has built a closed-loop process from raw material sourcing, processing and production, transportation and warehousing to direct export.',
    'Wood Chips are made from Acacia Wood Chips. Our wood chips find utility in both pulp and paper production as well as in biofuel applications.',
  ],
  overviewImage: 'assets/images/products/wood-chips-overview.jpeg',
  overviewImageAlt: 'Loading acacia wood chips for export',
  specs: [
    { label: 'Product Name', value: 'Wood Chips' },
    { label: 'Material', value: 'Acacia' },
    { label: 'Moisture', value: '40% to 55%' },
    { label: 'Size', value: '10-45mm, Customized' },
    { label: 'Bark & Rotten', value: 'Max 1% GMT' },
    { label: 'Color', value: 'Nature' },
    { label: 'Stuff', value: 'Bulk' },
    { label: 'MOQ', value: 'In bulk Vessel (15,000 BDMT)' },
    { label: 'Payment', value: 'T/T, L/C at sight' },
    { label: 'Capacity', value: '1 Million BDMT/year' },
  ],
  applicationsIntro: 'Our wood chips are widely used in multiple industries.',
  applications: [
    {
      icon: 'fileText',
      title: 'Pulp & paper industries',
      description: 'Used as raw material for pulp and paper production',
    },
    {
      icon: 'flame',
      title: 'Bioenergy',
      description:
        'Used as a biomass feedstock for energy generation through processes like combustion or gasification.',
    },
    {
      icon: 'feather',
      title: 'Animal Bedding',
      description: 'Employed as bedding material for animals, e.g. poultry and livestock',
    },
    {
      icon: 'plant',
      title: 'Landscaping and Mulching',
      description: 'Used as mulch in gardens and landscapes',
    },
    {
      icon: 'recycle',
      title: 'Composting',
      description: 'Added to compost piles to enhance aeration',
    },
  ],
  whyChoose: [
    {
      icon: 'ship',
      title: 'Export Success',
      description: 'Exported to China, Japan, and Korea',
    },
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
  videoUrl: 'https://youtu.be/ZRkgwLUkhp8',
  videoThumbnail: null,
  faqs: [
    {
      question: 'What are wood chips?',
      answer:
        'Wood chips are small, uniformly-sized pieces of acacia wood produced by mechanically chipping logs and timber offcuts. They are a versatile raw material for the pulp, paper and bioenergy industries.',
    },
    {
      question: 'What species and quality do you supply?',
      answer:
        'Our chips are made from sustainably grown acacia, with moisture of about 40–55%, sizes of 10–45 mm and bark & rotten content kept under 1% GMT.',
    },
    {
      question: 'What is your minimum order quantity?',
      answer:
        'We ship in bulk vessels with a minimum order of around 15,000 BDMT, and can tailor specifications to your requirements.',
    },
    {
      question: 'Which markets do you export to?',
      answer:
        'We regularly export to China, Japan and Korea, with a production capacity of about one million BDMT per year.',
    },
    {
      question: 'Are your wood chips certified?',
      answer:
        'Yes — our supply chain holds PEFC FM/COC certification, ensuring responsibly and legally sourced timber.',
    },
    {
      question: 'What payment terms do you accept?',
      answer:
        'We accept T/T and L/C at sight. Contact us for a detailed quotation based on your volume and destination.',
    },
  ],
};

const VI: ProductContent = {
  name: 'Xuất khẩu dăm gỗ',
  title: 'Xuất khẩu dăm gỗ',
  intro:
    'Chúng tôi cung cấp dăm gỗ keo chất lượng cao cho ngành giấy, bột giấy và năng lượng. Nguồn cung ổn định, chất lượng đồng đều và khai thác bền vững từ Việt Nam.',
  bannerImage: 'assets/images/products/wood-chips-banner.jpg',
  bannerAlt: 'Xuất khẩu dăm gỗ',
  badges: [
    { icon: 'truck', label: 'Nguồn cung ổn định' },
    { icon: 'circleCheck', label: 'Chất lượng đồng đều' },
    { icon: 'leaf', label: 'Khai thác bền vững' },
  ],
  overview: [
    'Với mục tiêu trở thành nhà xuất khẩu dăm gỗ lớn nhất Việt Nam, OFC đã xây dựng quy trình khép kín từ thu mua nguyên liệu, chế biến và sản xuất, vận chuyển và lưu kho cho đến xuất khẩu trực tiếp.',
    'Dăm gỗ được sản xuất từ gỗ keo. Sản phẩm được ứng dụng trong sản xuất bột giấy, giấy cũng như trong lĩnh vực nhiên liệu sinh học.',
  ],
  overviewImage: 'assets/images/products/wood-chips-overview.jpeg',
  overviewImageAlt: 'Bốc xếp dăm gỗ keo để xuất khẩu',
  specs: [
    { label: 'Tên sản phẩm', value: 'Dăm gỗ' },
    { label: 'Nguyên liệu', value: 'Gỗ keo' },
    { label: 'Độ ẩm', value: '40% đến 55%' },
    { label: 'Kích thước', value: '10-45mm, tùy chỉnh' },
    { label: 'Vỏ & mục', value: 'Tối đa 1% GMT' },
    { label: 'Màu sắc', value: 'Tự nhiên' },
    { label: 'Đóng gói', value: 'Hàng rời' },
    { label: 'MOQ', value: 'Tàu hàng rời (15.000 BDMT)' },
    { label: 'Thanh toán', value: 'T/T, L/C trả ngay' },
    { label: 'Công suất', value: '1 triệu BDMT/năm' },
  ],
  applicationsIntro: 'Dăm gỗ của chúng tôi được sử dụng rộng rãi trong nhiều ngành.',
  applications: [
    {
      icon: 'fileText',
      title: 'Ngành giấy & bột giấy',
      description: 'Dùng làm nguyên liệu cho sản xuất bột giấy và giấy',
    },
    {
      icon: 'flame',
      title: 'Năng lượng sinh học',
      description: 'Dùng làm nhiên liệu sinh khối để phát điện qua quá trình đốt hoặc khí hóa.',
    },
    {
      icon: 'feather',
      title: 'Lót chuồng',
      description: 'Dùng làm vật liệu lót chuồng cho vật nuôi, ví dụ gia cầm và gia súc',
    },
    {
      icon: 'plant',
      title: 'Cảnh quan & phủ gốc',
      description: 'Dùng làm lớp phủ trong vườn và cảnh quan',
    },
    {
      icon: 'recycle',
      title: 'Ủ phân',
      description: 'Bổ sung vào đống ủ để tăng độ thoáng khí',
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
  videoUrl: 'https://youtu.be/ZRkgwLUkhp8',
  videoThumbnail: null,
  faqs: [
    {
      question: 'Dăm gỗ là gì?',
      answer:
        'Dăm gỗ là những mảnh gỗ keo nhỏ, kích thước đồng đều, được tạo ra bằng cách băm cơ học các khúc gỗ và phần gỗ thừa. Đây là nguyên liệu đa năng cho ngành giấy, bột giấy và năng lượng sinh học.',
    },
    {
      question: 'Quý công ty cung cấp loại gỗ và chất lượng nào?',
      answer:
        'Dăm của chúng tôi được làm từ gỗ keo trồng bền vững, độ ẩm khoảng 40–55%, kích thước 10–45 mm và tỷ lệ vỏ & mục dưới 1% GMT.',
    },
    {
      question: 'Số lượng đặt hàng tối thiểu là bao nhiêu?',
      answer:
        'Chúng tôi giao hàng bằng tàu rời với đơn tối thiểu khoảng 15.000 BDMT, và có thể điều chỉnh thông số theo yêu cầu của bạn.',
    },
    {
      question: 'Quý công ty xuất khẩu sang những thị trường nào?',
      answer:
        'Chúng tôi thường xuyên xuất khẩu sang Trung Quốc, Nhật Bản và Hàn Quốc, với công suất khoảng một triệu BDMT mỗi năm.',
    },
    {
      question: 'Dăm gỗ có được chứng nhận không?',
      answer:
        'Có — chuỗi cung ứng của chúng tôi đạt chứng nhận PEFC FM/COC, đảm bảo nguồn gỗ hợp pháp và có trách nhiệm.',
    },
    {
      question: 'Quý công ty chấp nhận điều khoản thanh toán nào?',
      answer:
        'Chúng tôi chấp nhận T/T và L/C trả ngay. Hãy liên hệ để nhận báo giá chi tiết theo khối lượng và điểm đến.',
    },
  ],
};

export function woodChipsContent(locale: string): ProductContent {
  return locale.startsWith('vi') ? VI : EN;
}
