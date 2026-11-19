# Run in your own PowerShell session before starting the site.
$ErrorActionPreference = 'Stop'
function Read-PrivateHash([string]$Label, [int]$Minimum) {
    $secureValue = Read-Host $Label -AsSecureString
    $plainValue = [System.Net.NetworkCredential]::new('', $secureValue).Password
    if ($plainValue.Length -lt $Minimum) { throw "Use at least $Minimum characters for $Label." }
    $hash = [Security.Cryptography.SHA256]::Create()
    try { return [BitConverter]::ToString($hash.ComputeHash([Text.Encoding]::UTF8.GetBytes($plainValue))).Replace('-','').ToLowerInvariant() }
    finally { $hash.Dispose(); $secureValue.Dispose() }
}
$commandHash = Read-PrivateHash 'Choose a unique owner sequence' 24
$questionText = Read-Host 'Choose your private challenge question'
if ([string]::IsNullOrWhiteSpace($questionText)) { throw 'A question is required.' }
$answerHash = Read-PrivateHash 'Choose a unique answer passphrase' 16
$password = Read-Host 'Choose an independent publishing password (16+ characters)' -AsSecureString
if ($password.Length -lt 16) {throw 'Use at least 16 characters.'}
$salt = New-Object byte[] 16
$rng=[Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($salt)
$derive=[Security.Cryptography.Rfc2898DeriveBytes]::new([Net.NetworkCredential]::new('',$password).Password,$salt,600000,[Security.Cryptography.HashAlgorithmName]::SHA256)
$passwordKey=([BitConverter]::ToString($salt)+'.'+[BitConverter]::ToString($derive.GetBytes(32))).Replace('-','').ToLowerInvariant()
$derive.Dispose(); $password.Dispose(); $rng.Dispose()
$piperHash=Read-PrivateHash 'Choose a visitor discovery sequence for Piper' 6
$bonusHash = Read-PrivateHash 'Choose the rooftop discovery sequence' 4
foreach ($setting in @{ATLAS_OWNER_HASH=$commandHash; ATLAS_PIPER_HASH=$piperHash; ATLAS_PASSWORD_KEY=$passwordKey; ATLAS_QUESTION=$questionText; ATLAS_ANSWER_HASH=$answerHash; ATLAS_BONUS_HASH=$bonusHash}.GetEnumerator()) {
    [Environment]::SetEnvironmentVariable($setting.Key,$setting.Value,'User')
    [Environment]::SetEnvironmentVariable($setting.Key,$setting.Value,'Process')
}
Write-Host 'Configured for this Windows user. Restart the site from a fresh terminal.'
