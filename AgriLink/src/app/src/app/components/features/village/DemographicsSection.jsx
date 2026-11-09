import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card'
import { Progress } from '../../ui/progress'
import { Users, Building, GraduationCap, Home } from 'lucide-react'

export function DemographicsSection({ villageData }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Population Breakdown */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Population Demographics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Male</span>
              <span className="font-semibold">{villageData.population.male.toLocaleString()}</span>
            </div>
            <Progress value={(villageData.population.male / villageData.population.total) * 100} />
            
            <div className="flex justify-between items-center">
              <span>Female</span>
              <span className="font-semibold">{villageData.population.female.toLocaleString()}</span>
            </div>
            <Progress value={(villageData.population.female / villageData.population.total) * 100} />
            
            <div className="flex justify-between items-center">
              <span>Children (&lt;18)</span>
              <span className="font-semibold">{villageData.population.children.toLocaleString()}</span>
            </div>
            <Progress value={(villageData.population.children / villageData.population.total) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Occupation Distribution */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Occupation Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Farmers</span>
              <span className="font-semibold">{villageData.demographics.farmers.toLocaleString()}</span>
            </div>
            <Progress value={(villageData.demographics.farmers / villageData.demographics.workingPopulation) * 100} />
            
            <div className="flex justify-between items-center">
              <span>Business Owners</span>
              <span className="font-semibold">{villageData.demographics.businessOwners}</span>
            </div>
            <Progress value={(villageData.demographics.businessOwners / villageData.demographics.workingPopulation) * 100} />
            
            <div className="flex justify-between items-center">
              <span>Employees</span>
              <span className="font-semibold">{villageData.demographics.employees.toLocaleString()}</span>
            </div>
            <Progress value={(villageData.demographics.employees / villageData.demographics.workingPopulation) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Public Facilities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span>Schools</span>
              <span className="font-semibold">{villageData.facilities.schools}</span>
            </div>
            <div className="flex justify-between">
              <span>Hospitals</span>
              <span className="font-semibold">{villageData.facilities.hospitals}</span>
            </div>
            <div className="flex justify-between">
              <span>Temples</span>
              <span className="font-semibold">{villageData.facilities.temples}</span>
            </div>
            <div className="flex justify-between">
              <span>Banks</span>
              <span className="font-semibold">{villageData.facilities.banks}</span>
            </div>
            <div className="flex justify-between">
              <span>Post Office</span>
              <span className="font-semibold">{villageData.facilities.postOffice}</span>
            </div>
            <div className="flex justify-between">
              <span>Cooperatives</span>
              <span className="font-semibold">{villageData.facilities.cooperatives}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Household Information */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Household Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Total Households</span>
              <span className="font-semibold">{villageData.demographics.households}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Family Size</span>
              <span className="font-semibold">{villageData.demographics.avgFamilySize}</span>
            </div>
            <div className="flex justify-between">
              <span>Working Population</span>
              <span className="font-semibold">{villageData.demographics.workingPopulation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Literacy Rate</span>
              <span className="font-semibold">{villageData.population.literacy}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}