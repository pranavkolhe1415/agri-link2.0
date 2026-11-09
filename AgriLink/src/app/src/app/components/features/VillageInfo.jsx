import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { VillageHeader } from './village/VillageHeader'
import { DemographicsSection } from './village/DemographicsSection'
import { InfrastructureSection } from './village/InfrastructureSection'
import { HistorySection } from './village/HistorySection'
import { GeographySection } from './village/GeographySection'
import { CultureSection } from './village/CultureSection'
import { villageData } from './data/villageData'

export function VillageInfo() {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <VillageHeader villageData={villageData} />

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-6">
          <DemographicsSection villageData={villageData} />
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          <InfrastructureSection villageData={villageData} />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <HistorySection />
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <GeographySection />
        </TabsContent>

        <TabsContent value="culture" className="space-y-6">
          <CultureSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}