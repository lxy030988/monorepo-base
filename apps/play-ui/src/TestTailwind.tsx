import { Button } from '@monorepo-base/components'

export const TestTailwind = () => {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto bg-white min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900">Button 组件测试</h2>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">变体 (Variants)</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" label="Primary" />
          <Button variant="secondary" label="Secondary" />
          <Button variant="outline" label="Outline" />
          <Button variant="ghost" label="Ghost" />
          <Button variant="danger" label="Danger" />
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">尺寸 (Sizes)</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm" label="Small" />
          <Button variant="primary" size="md" label="Medium" />
          <Button variant="primary" size="lg" label="Large" />
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">状态 (States)</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button variant="primary" label="Normal" />
            <Button variant="primary" label="Disabled" disabled />
          </div>
          <Button variant="primary" label="Full Width" fullWidth />
        </div>
      </div>

      {/* All Variants with Different Sizes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">组合示例</h3>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="primary" size="sm" label="Primary SM" />
          <Button variant="secondary" size="sm" label="Secondary SM" />
          <Button variant="outline" size="sm" label="Outline SM" />

          <Button variant="primary" size="md" label="Primary MD" />
          <Button variant="secondary" size="md" label="Secondary MD" />
          <Button variant="outline" size="md" label="Outline MD" />

          <Button variant="primary" size="lg" label="Primary LG" />
          <Button variant="secondary" size="lg" label="Secondary LG" />
          <Button variant="danger" size="lg" label="Danger LG" />
        </div>
      </div>
    </div>
  )
}
