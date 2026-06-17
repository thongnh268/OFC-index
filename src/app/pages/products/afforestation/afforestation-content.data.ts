import { type ProductContent } from '../../../shared/components/product-page/product-content.model';

// Code-owned bilingual content for the Afforestation page (Figma node 2142:1272).
// NOTE: Figma reused the Timber spec table here by mistake, so the specs below are neutral,
// provisional afforestation program facts (replace with real figures when available). Card
// descriptions are from the design screenshots. Why-choose, the video blurb and `videoUrl`
// are shared OFC content (placeholder video — swap for the real link). FAQ is provisional.

const EN: ProductContent = {
  name: 'Afforestation',
  title: 'Sustainable Afforestation Initiatives',
  intro:
    'We are dedicated to large-scale afforestation and reforestation. Establishing healthy forests, enhancing biodiversity, and implementing sustainable carbon sequestration practices across Vietnam.',
  bannerImage: 'assets/images/products/afforestation-banner.png',
  bannerAlt: 'Sustainable afforestation initiatives',
  badges: [
    { icon: 'truck', label: 'Stable Supply' },
    { icon: 'circleCheck', label: 'Consistent Quality' },
    { icon: 'leaf', label: 'Sustainable Source' },
  ],
  overview: [
    'Afforestation is the process of planting trees on land that has not recently — or ever — been covered by a forest. It differs from reforestation, which involves replanting trees on land that was recently deforested.',
  ],
  overviewImage: 'assets/images/products/afforestation-overview.jpg',
  overviewImageAlt: 'Tree seedlings planted on a hillside',
  specs: [
    { label: 'Program', value: 'Afforestation & Reforestation' },
    { label: 'Main Species', value: 'Acacia, Eucalyptus' },
    { label: 'Seedling Source', value: 'Company nursery' },
    { label: 'Planting Standard', value: 'FSC / PEFC aligned' },
    { label: 'Survival Target', value: '> 90%' },
    { label: 'Rotation Cycle', value: '5 - 7 years' },
    { label: 'Certification', value: 'PEFC FM/COC' },
    { label: 'Coverage', value: 'Quang Ninh & northern Vietnam' },
  ],
  applicationsIntro:
    'Afforestation delivers benefits across the environment, climate and communities.',
  applications: [
    {
      icon: 'mountain',
      title: 'Soil Erosion Control',
      description: 'Prevents soil loss on slopes and riverbanks.',
    },
    {
      icon: 'leaf',
      title: 'Carbon Sequestration',
      description: 'Captures and stores atmospheric carbon dioxide.',
    },
    {
      icon: 'lungs',
      title: 'Air Quality Improvement',
      description: 'Filters pollutants and releases clean oxygen.',
    },
    {
      icon: 'sun',
      title: 'Urban Heat Island Mitigation',
      description: 'Cools city air temperatures and provides shade.',
    },
    {
      icon: 'droplet',
      title: 'Water Source Protection',
      description: 'Regulates water flow and filters runoff.',
    },
    {
      icon: 'feather',
      title: 'Biodiversity Conservation',
      description: 'Creates habitats for diverse wildlife species.',
    },
    {
      icon: 'tree',
      title: 'Sustainable Timber Production',
      description: 'Generates responsibly-sourced wood products.',
    },
    {
      icon: 'recycle',
      title: 'Landscape Restoration',
      description: 'Rehabilitates damaged ecosystems and creates beautiful spaces.',
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
  videoUrl: 'https://youtu.be/NMn-4ZWjk78',
  videoThumbnail: null,
  faqs: [
    {
      question: 'What is afforestation?',
      answer:
        'Afforestation is planting trees on land that has not recently been forested, creating new forest cover; reforestation replants recently cleared land.',
    },
    {
      question: 'Which species do you plant?',
      answer:
        'We mainly plant fast-growing acacia and eucalyptus from our own nursery, selected for the local climate and soil.',
    },
    {
      question: 'How does this support your products?',
      answer:
        'A managed planting and nursery system secures a traceable, sustainable raw-material supply for our wood chip, pellet and timber operations.',
    },
    {
      question: 'Are your forests certified?',
      answer:
        'Our forestry operations follow PEFC FM/COC standards for responsible, legal management.',
    },
  ],
};

const VI: ProductContent = {
  name: 'Trồng rừng',
  title: 'Sáng kiến trồng rừng bền vững',
  intro:
    'Chúng tôi tập trung vào trồng rừng và tái trồng rừng quy mô lớn — kiến tạo những cánh rừng khỏe mạnh, nâng cao đa dạng sinh học và thực hiện các giải pháp hấp thụ carbon bền vững trên khắp Việt Nam.',
  bannerImage: 'assets/images/products/afforestation-banner.png',
  bannerAlt: 'Sáng kiến trồng rừng bền vững',
  badges: [
    { icon: 'truck', label: 'Nguồn cung ổn định' },
    { icon: 'circleCheck', label: 'Chất lượng đồng đều' },
    { icon: 'leaf', label: 'Khai thác bền vững' },
  ],
  overview: [
    'Trồng rừng (afforestation) là quá trình trồng cây trên vùng đất chưa từng — hoặc đã rất lâu không — có rừng che phủ. Khác với tái trồng rừng (reforestation) là trồng lại cây trên vùng đất vừa bị mất rừng.',
  ],
  overviewImage: 'assets/images/products/afforestation-overview.jpg',
  overviewImageAlt: 'Cây giống được trồng trên sườn đồi',
  specs: [
    { label: 'Chương trình', value: 'Trồng rừng & tái trồng rừng' },
    { label: 'Loài chính', value: 'Keo, Bạch đàn' },
    { label: 'Nguồn cây giống', value: 'Vườn ươm công ty' },
    { label: 'Tiêu chuẩn trồng', value: 'Theo FSC / PEFC' },
    { label: 'Tỷ lệ sống mục tiêu', value: '> 90%' },
    { label: 'Chu kỳ khai thác', value: '5 - 7 năm' },
    { label: 'Chứng nhận', value: 'PEFC FM/COC' },
    { label: 'Phạm vi', value: 'Quảng Ninh & miền Bắc Việt Nam' },
  ],
  applicationsIntro: 'Trồng rừng mang lại lợi ích cho môi trường, khí hậu và cộng đồng.',
  applications: [
    {
      icon: 'mountain',
      title: 'Chống xói mòn đất',
      description: 'Ngăn mất đất trên sườn dốc và ven sông.',
    },
    {
      icon: 'leaf',
      title: 'Hấp thụ carbon',
      description: 'Hấp thụ và lưu giữ khí CO2 trong khí quyển.',
    },
    {
      icon: 'lungs',
      title: 'Cải thiện chất lượng không khí',
      description: 'Lọc chất ô nhiễm và giải phóng oxy sạch.',
    },
    {
      icon: 'sun',
      title: 'Giảm hiệu ứng đảo nhiệt đô thị',
      description: 'Làm mát không khí đô thị và tạo bóng mát.',
    },
    {
      icon: 'droplet',
      title: 'Bảo vệ nguồn nước',
      description: 'Điều hòa dòng chảy và lọc nước mưa.',
    },
    {
      icon: 'feather',
      title: 'Bảo tồn đa dạng sinh học',
      description: 'Tạo môi trường sống cho nhiều loài hoang dã.',
    },
    {
      icon: 'tree',
      title: 'Sản xuất gỗ bền vững',
      description: 'Tạo ra sản phẩm gỗ có nguồn gốc trách nhiệm.',
    },
    {
      icon: 'recycle',
      title: 'Phục hồi cảnh quan',
      description: 'Phục hồi hệ sinh thái bị suy thoái và tạo cảnh quan đẹp.',
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
  videoUrl: 'https://youtu.be/NMn-4ZWjk78',
  videoThumbnail: null,
  faqs: [
    {
      question: 'Trồng rừng (afforestation) là gì?',
      answer:
        'Trồng rừng là việc trồng cây trên vùng đất lâu nay chưa có rừng, tạo lớp phủ rừng mới; còn tái trồng rừng là trồng lại trên đất vừa bị mất rừng.',
    },
    {
      question: 'Quý công ty trồng những loài nào?',
      answer:
        'Chúng tôi chủ yếu trồng keo và bạch đàn sinh trưởng nhanh từ vườn ươm của công ty, chọn lọc phù hợp khí hậu và thổ nhưỡng địa phương.',
    },
    {
      question: 'Việc này hỗ trợ sản phẩm thế nào?',
      answer:
        'Hệ thống trồng rừng và vườn ươm được quản lý giúp đảm bảo nguồn nguyên liệu bền vững, truy xuất được cho hoạt động dăm gỗ, viên nén và chế biến gỗ.',
    },
    {
      question: 'Rừng có được chứng nhận không?',
      answer:
        'Hoạt động lâm nghiệp của chúng tôi tuân theo tiêu chuẩn PEFC FM/COC về quản lý hợp pháp, có trách nhiệm.',
    },
  ],
};

export function afforestationContent(locale: string): ProductContent {
  return locale.startsWith('vi') ? VI : EN;
}
