"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useWeb3 } from "@/components/web3-provider"

export function ProfileSettings() {
  const { account, balance, chainId } = useWeb3()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Avatar</Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" placeholder="Enter your display name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." />
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Wallet Information */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Wallet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Connected Wallet</span>
                <Badge variant="outline">
                  {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Balance</span>
                <span className="text-sm">{balance} ETH</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Network</span>
                <Badge variant="secondary">
                  {chainId === 1 ? "Ethereum" : chainId === 137 ? "Polygon" : "Unknown"}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Backup & Recovery</h4>
              <Button variant="outline" className="w-full bg-transparent">
                Export Private Key
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Seed Phrase
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email updates about your tickets and events</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about upcoming events and ticket updates</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional emails about new events</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Transaction Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified about blockchain transactions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-enhanced">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Session Management</h4>
              <p className="text-sm text-muted-foreground">Manage your active sessions across devices</p>
              <Button variant="outline">View Active Sessions</Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Account Actions</h4>
              <div className="flex space-x-2">
                <Button variant="outline">Export Data</Button>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
