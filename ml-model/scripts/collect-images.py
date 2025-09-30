#collecting images from icrawler so we don't have to manually find ~200 images
#for each landmark.
from icrawler.builtin import GoogleImageCrawler,BaiduImageCrawler,BingImageCrawler


#boudha-stupa (looking @ google only game me 48 images, gonna use bing aswell for each landmark.)
google_crawler = GoogleImageCrawler(storage={'root_dir':'C:/Users/ashut/Desktop/KTMVTour/ml-model/dataset/boudha-stupa'})
google_crawler.crawl(keyword='boudha stupa',max_num=100)

bing_crawler = BingImageCrawler(storage={'root_dir':'C:/Users/ashut/Desktop/KTMVTour/ml-model/dataset/boudha-stupa'})
queries = ["Boudhanath Stupa Kathmandu", "Boudha Stupa Nepal UNESCO", "Boudhanath aerial view","boudhanath closeup view"]
for q in queries:
    bing_crawler.crawl(keyword=q, max_num=100)

#dharahara
google_crawler = GoogleImageCrawler(storage={'root_dir':'C:/Users/ashut/Desktop/KTMVTour/ml-model/dataset/dharahara'})
google_crawler.crawl(keyword='Dharahara',max_num=100)

bing_crawler = BingImageCrawler(storage={'root_dir':'C:/Users/ashut/Desktop/KTMVTour/ml-model/dataset/dharahara'})
queries = [
    "Dhara Hara Kathmandu", 
    "Dhara Hara Nepal UNESCO", 
    "Dhara Hara tower", 
    "Dharahara tower Kathmandu view", 
    "Dhara Hara historical monument", 
    "Dhara Hara Kathmandu aerial view", 
    "Dharahara tower rebuilt 2020", 
    "Dhara Hara heritage Kathmandu", 
    "Bhimsen Tower Kathmandu"
]
for q in queries:
    bing_crawler.crawl(keyword=q, max_num=100)