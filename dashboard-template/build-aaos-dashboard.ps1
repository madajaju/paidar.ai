$ErrorActionPreference = 'Stop'
$outFile = 'C:\Users\darre\IdeaProjects\paidar.ai\dashboard-template\AAOS-Dashboard-Template.xlsx'

$xl = $null
$wb = $null
$ws = $null
$sData = $null
$sMet = $null
$sDash = $null
$sInt = $null
$sLog = $null

function Release-ComObjectSafe($obj) {
  if ($null -ne $obj) {
    try { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($obj) | Out-Null } catch {}
  }
}

$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false
$xl.DisplayAlerts = $false

try {
  $wb = $xl.Workbooks.Add()

  while ($wb.Worksheets.Count -gt 1) { $wb.Worksheets.Item(2).Delete() }
  $ws = $wb.Worksheets.Item(1)
  $ws.Name = 'Instructions'

  $sData = $wb.Worksheets.Add(); $sData.Name = 'Data_Input'
  $sMet  = $wb.Worksheets.Add(); $sMet.Name  = 'Metrics'
  $sDash = $wb.Worksheets.Add(); $sDash.Name = 'Dashboard'
  $sInt  = $wb.Worksheets.Add(); $sInt.Name  = 'Interpretation'
  $sLog  = $wb.Worksheets.Add(); $sLog.Name  = 'Action_Log'

  $ws.Range('A1').Value2 = 'AAOS Dashboard Template'
  $ws.Range('A1').Font.Bold = $true
  $ws.Range('A1').Font.Size = 18
  $ws.Range('A3').Value2 = 'Purpose'
  $ws.Range('A3').Font.Bold = $true
  $ws.Range('A4').Value2 = 'Track AAOS operating health using weighted performance domains and guardrails from the book.'
  $ws.Range('A6').Value2 = 'How to use'
  $ws.Range('A6').Font.Bold = $true
  $ws.Range('A7').Value2 = '1) Enter monthly values in Data_Input (0-100 unless noted).'
  $ws.Range('A8').Value2 = '2) Review weighted/guardrailed score in Metrics.'
  $ws.Range('A9').Value2 = '3) Use Dashboard for executive reporting.'
  $ws.Range('A10').Value2 = '4) Use Interpretation and Action_Log to drive interventions.'
  $ws.Range('A12').Value2 = 'Weights'
  $ws.Range('A12').Font.Bold = $true
  $ws.Range('A13').Value2 = 'Outcome Confidence (35%)'
  $ws.Range('A14').Value2 = 'Control System Health (30%)'
  $ws.Range('A15').Value2 = 'Flow & Throughput (20%)'
  $ws.Range('A16').Value2 = 'Learning & Drift (15%)'
  $ws.Columns('A:B').ColumnWidth = 70

  $headers = @(
    'Period','Outcome Confidence','Control System Health','Flow & Throughput','Learning & Drift',
    'Evidence Coverage %','Error Recurrence Trend','Strategic Decisions Total','Defensible Decisions',
    'Cycle Time (Days)','Escalations Count','Incidents Count',
    'Diagnose','Align','Govern','Enable','Measure','Scale','Notes'
  )
  for ($i=0; $i -lt $headers.Count; $i++) { $sData.Cells.Item(1,$i+1).Value2 = $headers[$i] }
  $sData.Range('A1:S1').Font.Bold = $true
  $sData.Range('A1:S1').Interior.Color = 15790320
  $sData.Range('A1:S1').Borders.LineStyle = 1

  for ($r=2; $r -le 25; $r++) {
    $sData.Cells.Item($r,1).Value2 = "Month $($r-1)"
    $sData.Cells.Item($r,2).Value2 = 70
    $sData.Cells.Item($r,3).Value2 = 70
    $sData.Cells.Item($r,4).Value2 = 70
    $sData.Cells.Item($r,5).Value2 = 70
    $sData.Cells.Item($r,6).Value2 = 90
    $sData.Cells.Item($r,7).Value2 = 'Stable'
    $sData.Cells.Item($r,8).Value2 = 20
    $sData.Cells.Item($r,9).Value2 = 16
    $sData.Cells.Item($r,10).Value2 = 15
    $sData.Cells.Item($r,11).Value2 = 2
    $sData.Cells.Item($r,12).Value2 = 1
    for ($c=13; $c -le 18; $c++) { $sData.Cells.Item($r,$c).Value2 = 3 }
  }

  $sData.Columns('A').ColumnWidth = 14
  $sData.Columns('B:F').ColumnWidth = 22
  $sData.Columns('G').ColumnWidth = 20
  $sData.Columns('H:L').ColumnWidth = 22
  $sData.Columns('M:R').ColumnWidth = 10
  $sData.Columns('S').ColumnWidth = 36
  $sData.Range('A1:S25').Borders.LineStyle = 1

  $sMet.Range('A1').Value2 = 'AAOS Measurement Engine'
  $sMet.Range('A1').Font.Bold = $true
  $sMet.Range('A1').Font.Size = 16
  $sMet.Range('A3').Value2 = 'Latest Period'
  $sMet.Range('B3').Formula = '=LOOKUP(2,1/(Data_Input!A:A<>""),Data_Input!A:A)'

  $sMet.Range('A5').Value2 = 'Weighted Domain Score'
  $sMet.Range('A5').Font.Bold = $true

  $sMet.Range('A6').Value2 = 'Outcome Confidence'
  $sMet.Range('B6').Value2 = 0.35
  $sMet.Range('C6').Formula = '=INDEX(Data_Input!B:B,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('D6').Formula = '=B6*C6'

  $sMet.Range('A7').Value2 = 'Control System Health'
  $sMet.Range('B7').Value2 = 0.30
  $sMet.Range('C7').Formula = '=INDEX(Data_Input!C:C,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('D7').Formula = '=B7*C7'

  $sMet.Range('A8').Value2 = 'Flow & Throughput'
  $sMet.Range('B8').Value2 = 0.20
  $sMet.Range('C8').Formula = '=INDEX(Data_Input!D:D,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('D8').Formula = '=B8*C8'

  $sMet.Range('A9').Value2 = 'Learning & Drift'
  $sMet.Range('B9').Value2 = 0.15
  $sMet.Range('C9').Formula = '=INDEX(Data_Input!E:E,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('D9').Formula = '=B9*C9'

  $sMet.Range('A10').Value2 = 'Base Composite'
  $sMet.Range('B10').Formula = '=SUM(D6:D9)'

  $sMet.Range('A12').Value2 = 'Guardrails'
  $sMet.Range('A12').Font.Bold = $true
  $sMet.Range('A13').Value2 = 'CSH < 75 cap'
  $sMet.Range('B13').Formula = '=IF(C7<75,85,100)'
  $sMet.Range('A14').Value2 = 'CSH < 65 cap'
  $sMet.Range('B14').Formula = '=IF(C7<65,75,100)'
  $sMet.Range('A15').Value2 = 'Evidence Coverage < 90 penalty'
  $sMet.Range('B15').Formula = '=IF(INDEX(Data_Input!F:F,MATCH($B$3,Data_Input!A:A,0))<90,-5,0)'
  $sMet.Range('A16').Value2 = 'Error Recurrence Rising penalty'
  $sMet.Range('B16').Formula = '=IF(INDEX(Data_Input!G:G,MATCH($B$3,Data_Input!A:A,0))="Rising",-5,0)'

  $sMet.Range('A18').Value2 = 'Capped Score'
  $sMet.Range('B18').Formula = '=MIN(B10,B13,B14)+B15+B16'
  $sMet.Range('A19').Value2 = 'Final Score (0-100)'
  $sMet.Range('B19').Formula = '=MAX(0,MIN(100,B18))'
  $sMet.Range('A20').Value2 = 'Band'
  $sMet.Range('B20').Formula = '=IF(B19>=90,"Strong",IF(B19>=75,"Watch",IF(B19>=60,"Risk","Breakdown")))'

  $sMet.Range('A22').Value2 = 'Decision Defensibility %'
  $sMet.Range('B22').Formula = '=IFERROR(INDEX(Data_Input!I:I,MATCH($B$3,Data_Input!A:A,0))/INDEX(Data_Input!H:H,MATCH($B$3,Data_Input!A:A,0)),0)'
  $sMet.Range('A23').Value2 = 'Avg Cycle Time (days)'
  $sMet.Range('B23').Formula = '=INDEX(Data_Input!J:J,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('A24').Value2 = 'Escalations'
  $sMet.Range('B24').Formula = '=INDEX(Data_Input!K:K,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('A25').Value2 = 'Incidents'
  $sMet.Range('B25').Formula = '=INDEX(Data_Input!L:L,MATCH($B$3,Data_Input!A:A,0))'

  $sMet.Range('A27').Value2 = 'Stage Maturity (0-5)'
  $sMet.Range('A27').Font.Bold = $true
  $sMet.Range('A28').Value2 = 'Diagnose'; $sMet.Range('B28').Formula = '=INDEX(Data_Input!M:M,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('A29').Value2 = 'Align';    $sMet.Range('B29').Formula = '=INDEX(Data_Input!N:N,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('A30').Value2 = 'Govern';   $sMet.Range('B30').Formula = '=INDEX(Data_Input!O:O,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('A31').Value2 = 'Enable';   $sMet.Range('B31').Formula = '=INDEX(Data_Input!P:P,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('A32').Value2 = 'Measure';  $sMet.Range('B32').Formula = '=INDEX(Data_Input!Q:Q,MATCH($B$3,Data_Input!A:A,0))'
  $sMet.Range('A33').Value2 = 'Scale';    $sMet.Range('B33').Formula = '=INDEX(Data_Input!R:R,MATCH($B$3,Data_Input!A:A,0))'

  $sMet.Columns('A').ColumnWidth = 34
  $sMet.Columns('B:D').ColumnWidth = 20
  $sMet.Range('B6:B9').NumberFormat = '0.00'
  $sMet.Range('C6:D10').NumberFormat = '0.00'
  $sMet.Range('B19').NumberFormat = '0.0'
  $sMet.Range('B22').NumberFormat = '0.0%'
  $sMet.Range('A5:D9').Borders.LineStyle = 1
  $sMet.Range('A12:B16').Borders.LineStyle = 1
  $sMet.Range('A18:B25').Borders.LineStyle = 1
  $sMet.Range('A27:B33').Borders.LineStyle = 1

  $sDash.Range('A1').Value2 = 'AAOS Executive Dashboard'
  $sDash.Range('A1').Font.Bold = $true
  $sDash.Range('A1').Font.Size = 18
  $sDash.Range('A3').Value2 = 'Reporting Period:'
  $sDash.Range('B3').Formula = '=Metrics!B3'
  $sDash.Range('A5').Value2 = 'Final Score';              $sDash.Range('B5').Formula = '=Metrics!B19'
  $sDash.Range('A6').Value2 = 'Band';                     $sDash.Range('B6').Formula = '=Metrics!B20'
  $sDash.Range('A7').Value2 = 'Decision Defensibility';   $sDash.Range('B7').Formula = '=Metrics!B22'
  $sDash.Range('A8').Value2 = 'Cycle Time (days)';        $sDash.Range('B8').Formula = '=Metrics!B23'
  $sDash.Range('A9').Value2 = 'Escalations';              $sDash.Range('B9').Formula = '=Metrics!B24'
  $sDash.Range('A10').Value2 = 'Incidents';               $sDash.Range('B10').Formula = '=Metrics!B25'

  $sDash.Range('D5').Value2 = 'Domain Scores'
  $sDash.Range('D5').Font.Bold = $true
  $sDash.Range('D6').Value2 = 'Outcome Confidence';     $sDash.Range('E6').Formula = '=Metrics!C6'
  $sDash.Range('D7').Value2 = 'Control System Health';  $sDash.Range('E7').Formula = '=Metrics!C7'
  $sDash.Range('D8').Value2 = 'Flow & Throughput';      $sDash.Range('E8').Formula = '=Metrics!C8'
  $sDash.Range('D9').Value2 = 'Learning & Drift';       $sDash.Range('E9').Formula = '=Metrics!C9'

  $sDash.Range('D11').Value2 = 'Stage Maturity (0-5)'
  $sDash.Range('D11').Font.Bold = $true
  $sDash.Range('D12').Value2 = 'Diagnose'; $sDash.Range('E12').Formula = '=Metrics!B28'
  $sDash.Range('D13').Value2 = 'Align';    $sDash.Range('E13').Formula = '=Metrics!B29'
  $sDash.Range('D14').Value2 = 'Govern';   $sDash.Range('E14').Formula = '=Metrics!B30'
  $sDash.Range('D15').Value2 = 'Enable';   $sDash.Range('E15').Formula = '=Metrics!B31'
  $sDash.Range('D16').Value2 = 'Measure';  $sDash.Range('E16').Formula = '=Metrics!B32'
  $sDash.Range('D17').Value2 = 'Scale';    $sDash.Range('E17').Formula = '=Metrics!B33'

  $sDash.Range('A5:B10').Borders.LineStyle = 1
  $sDash.Range('A5:B10').Interior.Color = 16249573
  $sDash.Range('D6:E9').Borders.LineStyle = 1
  $sDash.Range('D12:E17').Borders.LineStyle = 1
  $sDash.Columns('A').ColumnWidth = 22
  $sDash.Columns('B').ColumnWidth = 18
  $sDash.Columns('D').ColumnWidth = 28
  $sDash.Columns('E').ColumnWidth = 12
  $sDash.Range('B5').NumberFormat = '0.0'
  $sDash.Range('B7').NumberFormat = '0.0%'

  $sInt.Range('A1').Value2 = 'Interpretation Guide'
  $sInt.Range('A1').Font.Bold = $true
  $sInt.Range('A1').Font.Size = 16
  $sInt.Range('A3').Value2 = 'Band'
  $sInt.Range('B3').Value2 = 'Meaning'
  $sInt.Range('C3').Value2 = 'Leadership Action'
  $sInt.Range('A3:C3').Font.Bold = $true
  $sInt.Range('A4').Value2 = 'Strong (90-100)'
  $sInt.Range('B4').Value2 = 'System is defensible and scaling.'
  $sInt.Range('C4').Value2 = 'Increase scope while preserving controls.'
  $sInt.Range('A5').Value2 = 'Watch (75-89)'
  $sInt.Range('B5').Value2 = 'Performance acceptable but fragile.'
  $sInt.Range('C5').Value2 = 'Stabilize weakest domain and remove bottleneck.'
  $sInt.Range('A6').Value2 = 'Risk (60-74)'
  $sInt.Range('B6').Value2 = 'Decision quality and execution drift are visible.'
  $sInt.Range('C6').Value2 = 'Launch corrective program with weekly oversight.'
  $sInt.Range('A7').Value2 = 'Breakdown (<60)'
  $sInt.Range('B7').Value2 = 'Control and outcomes are not reliable.'
  $sInt.Range('C7').Value2 = 'Pause scale, restore governance, recover evidence discipline.'
  $sInt.Range('A3:C7').Borders.LineStyle = 1
  $sInt.Columns('A').ColumnWidth = 18
  $sInt.Columns('B').ColumnWidth = 45
  $sInt.Columns('C').ColumnWidth = 55

  $sLog.Range('A1').Value2 = 'AAOS Action Log'
  $sLog.Range('A1').Font.Bold = $true
  $sLog.Range('A1').Font.Size = 16
  $logHeaders = @('Date','Owner','Issue','Linked Stage','Intervention','Due Date','Status','Outcome Note')
  for ($i=0; $i -lt $logHeaders.Count; $i++) { $sLog.Cells.Item(3,$i+1).Value2 = $logHeaders[$i] }
  $sLog.Range('A3:H3').Font.Bold = $true
  $sLog.Range('A3:H3').Interior.Color = 15790320
  $sLog.Range('A3:H40').Borders.LineStyle = 1
  $sLog.Columns('A').ColumnWidth = 12
  $sLog.Columns('B').ColumnWidth = 18
  $sLog.Columns('C').ColumnWidth = 32
  $sLog.Columns('D').ColumnWidth = 14
  $sLog.Columns('E').ColumnWidth = 32
  $sLog.Columns('F').ColumnWidth = 12
  $sLog.Columns('G').ColumnWidth = 12
  $sLog.Columns('H').ColumnWidth = 36

  $sData.Activate(); $xl.ActiveWindow.SplitRow = 1; $xl.ActiveWindow.FreezePanes = $true
  $sDash.Activate()

  $wb.SaveAs($outFile, 51)
  $wb.Close($true)
}
finally {
  if ($xl) { try { $xl.Quit() } catch {} }
  Release-ComObjectSafe $sLog
  Release-ComObjectSafe $sInt
  Release-ComObjectSafe $sDash
  Release-ComObjectSafe $sMet
  Release-ComObjectSafe $sData
  Release-ComObjectSafe $ws
  Release-ComObjectSafe $wb
  Release-ComObjectSafe $xl
  [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
